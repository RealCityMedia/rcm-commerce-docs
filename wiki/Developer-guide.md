# Developer guide

Use HTTPS on the RCM API origin supplied by the store owner. Send the full publishable website key in `X-RCM-Key` on storefront requests. Keep the server key in your backend.

1. Verify the connection with `GET /v1/storefront/store`.
2. Fetch the catalog and use variant IDs for cart lines.
3. Start hosted checkout with `POST /v1/storefront/checkout` and redirect to the returned URL.
4. On return, call the checkout confirmation endpoint to read actual payment status.
5. For a custom collaboration design, call `GET /v1/storefront/collaborations` and respect the `enabled` flag. Preset layouts are available as a web component when you want an embed.

[Developer walkthrough and examples](https://lilman514.github.io/rcm-commerce-docs/developers.html) · [API endpoint reference](https://lilman514.github.io/rcm-commerce-docs/api.html)
