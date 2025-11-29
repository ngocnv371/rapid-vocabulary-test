import { createClient } from "npm:@supabase/supabase-js@2.25.0";
import { PayOS } from "npm:@payos/node@2.0.3";
const payOS = new PayOS({
  clientId: Deno.env.get("PAYOS_CLIENT_ID") || "",
  apiKey: Deno.env.get("PAYOS_API_KEY") || "",
  checksumKey: Deno.env.get("PAYOS_CHECKSUM_KEY") || "",
});
function getClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase env not configured");
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  });
  return supabase;
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
async function createOrder(client, product_id, authToken) {
  const token = authToken?.replace("Bearer ", "") || "";
  // Get authenticated user from JWT token
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser(token);
  if (authError || !user) {
    console.error("Authentication error:", authError);
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
  // Reject anonymous users
  if (user.is_anonymous) {
    return new Response(
      JSON.stringify({
        error: "Anonymous users cannot create orders",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
  // Get user's profile to get profile_id
  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();
  if (profileError || !profile) {
    return new Response(
      JSON.stringify({
        error: "Profile not found",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
  // Get product details
  const { data: product, error: productError } = await client
    .from("products")
    .select("*")
    .eq("id", product_id)
    .eq("active", true)
    .single();
  if (productError || !product) {
    return new Response(
      JSON.stringify({
        error: "Product not found or inactive",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
  // Create order record with pending status
  const { data: order, error: orderError } = await client
    .from("orders")
    .insert({
      profile_id: profile.id,
      product_id: product.id,
      credits: product.credits + product.bonus_credits,
      amount: product.price,
      currency: product.currency,
      payment_status: "pending",
      payment_id: null,
    })
    .select()
    .single();
  if (orderError || !order) {
    console.error("Failed to create order record:", orderError);
    return new Response(
      JSON.stringify({
        error: "Failed to create order record",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
  // Create PayOS payment link
  try {
    const paymentData = {
      orderCode: order.id,
      amount: product.price,
      description: `${product.name} - ${
        product.credits + product.bonus_credits
      } credits`,
      returnUrl: `${Deno.env.get("APP_URL") || ""}/payment/success`,
      cancelUrl: `${Deno.env.get("APP_URL") || ""}/payment/cancel`,
    };
    const paymentRequest = await payOS.paymentRequests.create(paymentData);
    const { checkoutUrl, qrCode, paymentLinkId, reference, description } = paymentRequest;
    // Update order with payment_id from PayOS
    await client
      .from("orders")
      .update({
        payment_id: paymentLinkId,
        checkout_url: checkoutUrl,
        reference,
        description,
      })
      .eq("id", order.id);
    return new Response(
      JSON.stringify({
        checkoutUrl,
        qrCode,
        reference,
        description,
        orderId: order.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("PayOS error:", error);
    // Update order status to failed
    await client
      .from("orders")
      .update({
        payment_status: "failed",
      })
      .eq("id", order.id);
    return new Response(
      JSON.stringify({
        error: "Failed to create payment link",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
}
function isFakeWebhook(payload) {
  return (
    payload.orderCode == 123 &&
    payload.description == "VQRIO123" &&
    payload.accountNumber == "12345678"
  );
}
async function verifyOrder(client, payload) {
  try {
    // Verify webhook signature
    const webhookData = await payOS.webhooks.verify(payload);
    if (!webhookData || webhookData.code !== "00") {
      return new Response(
        JSON.stringify({
          error: "Invalid webhook data or payment failed",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    const orderCode = webhookData.orderCode.toString();
    if (isFakeWebhook(webhookData)) {
      // return success for fake webhook
      return new Response(
        JSON.stringify({
          success: true,
          message: "Fake webhook received",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    // Find the order by payment_id (orderCode)
    const { data: order, error: orderError } = await client
      .from("orders")
      .select("*")
      .eq("payment_id", orderCode)
      .single();
    if (orderError || !order) {
      console.error("Order not found:", orderError);
      return new Response(
        JSON.stringify({
          error: "Order not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    // Check if already processed
    if (order.payment_status === "completed") {
      return new Response(
        JSON.stringify({
          message: "Payment already processed",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    // Update order status to completed
    const { error: updateOrderError } = await client
      .from("orders")
      .update({
        payment_status: "completed",
      })
      .eq("id", order.id);
    if (updateOrderError) {
      console.error("Failed to update order:", updateOrderError);
      return new Response(
        JSON.stringify({
          error: "Failed to update order status",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    // Add credits to user's account
    const { data: existingCredits } = await client
      .from("credits")
      .select("amount")
      .eq("profile_id", order.profile_id)
      .single();
    if (existingCredits) {
      // Update existing credits
      const { error: updateCreditsError } = await client
        .from("credits")
        .update({
          amount: existingCredits.amount + order.credits,
        })
        .eq("profile_id", order.profile_id);
      if (updateCreditsError) {
        console.error("Failed to update credits:", updateCreditsError);
        return new Response(
          JSON.stringify({
            error: "Failed to update credits",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
    } else {
      // Create new credits record
      const { error: insertCreditsError } = await client
        .from("credits")
        .insert({
          profile_id: order.profile_id,
          amount: order.credits,
        });
      if (insertCreditsError) {
        console.error("Failed to insert credits:", insertCreditsError);
        return new Response(
          JSON.stringify({
            error: "Failed to create credits",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified and credits added",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Webhook verification error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to verify webhook signature",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
}
Deno.serve(async (req) => {
  const { url, method } = req;
  try {
    if (method === "OPTIONS") {
      return new Response("ok", {
        headers: corsHeaders,
      });
    }
    const client = getClient();
    switch (true) {
      case url.includes("?product_id=") && method === "POST":
        const authToken = req.headers.get("Authorization") || "";
        return await createOrder(
          client,
          url.split("?product_id=")[1],
          authToken
        );
      case url.endsWith("/order") && method === "POST":
        const body = await req.json();
        return await verifyOrder(client, body);
      default:
        return new Response(
          JSON.stringify({
            error: "Not found",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
    }
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
