# Order Edge Function

## Overview

This Deno-based edge function handles payment processing through PayOS integration. It is deployed as a Supabase Edge Function at the `/order` endpoint.

## Deployment

Deploy this function to Supabase Edge Functions:
```bash
supabase functions deploy order
```

## API Endpoints

### 1. Create Order

**Endpoint:** `POST /order?product_id={product_id}`

**Purpose:** Initiates a payment request with PayOS and returns a payment link to the client.

**Authentication:** Requires user authentication via `Authorization` header. The user ID is automatically inferred from the JWT token.

**Parameters:**
- `product_id` (query parameter, required): The ID of the product being purchased

**Request Example:**
```http
POST /order?product_id=123
Authorization: Bearer <user_token>
```

**Response:**
Returns a PayOS payment link that redirects the user to the payment gateway.

---

### 2. Verify Order (Webhook)

**Endpoint:** `POST /order`

**Purpose:** Webhook callback from PayOS to confirm payment completion.

**Authentication:** Executed with service role credentials (not user-authenticated).

**Documentation:** [PayOS Webhook Documentation](https://payos.vn/docs/du-lieu-tra-ve/webhook/#tag/payment-webhook/operation/payment-webhook)

**Webhook Payload Example:**
```json
{
  "code": "00",
  "desc": "success",
  "success": true,
  "data": {
    "orderCode": 123,
    "amount": 3000,
    "description": "VQRIO123",
    "accountNumber": "12345678",
    "reference": "TF230204212323",
    "transactionDateTime": "2023-02-04 18:25:00",
    "currency": "VND",
    "paymentLinkId": "124c33293c43417ab7879e14c8d9eb18",
    "code": "00",
    "desc": "Thành công",
    "counterAccountBankId": "",
    "counterAccountBankName": "",
    "counterAccountName": "",
    "counterAccountNumber": "",
    "virtualAccountName": "",
    "virtualAccountNumber": ""
  },
  "signature": "8d8640d802576397a1ce45ebda7f835055768ac7ad2e0bfb77f9b8f12cca4c7f"
}
```

**Payload Fields:**
- `code`: Response code (`"00"` indicates success)
- `desc`: Description of the transaction result
- `success`: Boolean indicating transaction success
- `data.orderCode`: Unique order identifier
- `data.amount`: Transaction amount in VND
- `data.transactionDateTime`: Timestamp of the transaction
- `signature`: Security signature for webhook verification

## Security Considerations

- User requests are authenticated via JWT tokens
- Webhook requests use service role authentication
