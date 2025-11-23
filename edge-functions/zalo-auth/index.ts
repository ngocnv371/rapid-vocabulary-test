import { createClient } from "npm:@supabase/supabase-js@2.25.0";
// This function verifies the zalo token. Replace with real API call.
async function verifyZaloToken(zaloAccessToken) {
  // Placeholder: simulate an API call
  // In production, call Zalo's API and return { userId, name, avatarUrl }
  return {
    id: `zalo_${zaloAccessToken.slice(0, 8)}`,
    name: 'Zalo User',
    avatar: 'https://example.com/avatar.png'
  };
}
function getClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !supabaseKey) return new Response(JSON.stringify({
    error: 'Supabase env not configured'
  }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false
    }
  });
  return supabase;
}
Deno.serve(async (req)=>{
  try {
    if (req.method !== 'POST') return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await req.json().catch(()=>null);
    const zaloAccessToken = body?.zalo_access_token;
    if (!zaloAccessToken) return new Response(JSON.stringify({
      error: 'zalo_access_token is required'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Verify token with Zalo
    const zaloUser = await verifyZaloToken(zaloAccessToken);
    if (!zaloUser?.id) return new Response(JSON.stringify({
      error: 'Invalid zalo token'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const supabase = getClient();
    const email = `${zaloUser.id}@zalo.vn`;
    console.log('email', email);
    let targetUserId = null;
    // Check if the user exists
    const { data: lookupProfile, error: lookupError } = await supabase.from('profiles').select('*').eq('zalo_id', zaloUser.id).maybeSingle();
    if (lookupError) {
      console.error(lookupError);
      return new Response(JSON.stringify({
        error: 'Failed to find user',
        detail: lookupError
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    if (lookupProfile) {
      targetUserId = lookupProfile.id;
      console.log('look up user', lookupProfile);
    }
    if (!targetUserId) {
      // Upsert user using Admin API
      const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        user_metadata: {
          zalo_id: zaloUser.id,
          name: zaloUser.name,
          avatar_url: zaloUser.avatar
        },
        email_confirm: true
      });
      if (createError) {
        console.error(createError);
        return new Response(JSON.stringify({
          error: 'Failed to create user',
          detail: createError.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      if (createdUser) {
        targetUserId = createdUser.id;
        console.log('created user', createdUser);
      }
    }
    console.log('target user id', targetUserId);
    // Generate a magic link (otp)
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email
    }).catch(()=>({
        data: null,
        error: {
          message: 'generateLink not supported'
        }
      }));
    if (linkError) {
      console.error(linkError);
      return new Response(JSON.stringify({
        error: 'Failed to create user',
        detail: linkError.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    const { email_otp, hashed_token } = linkData?.properties;
    return new Response(JSON.stringify({
      email_otp,
      hashed_token
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
