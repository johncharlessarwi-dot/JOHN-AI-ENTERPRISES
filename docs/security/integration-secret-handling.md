# Integration secret handling standard

API keys, OAuth tokens, webhook secrets, and provider credentials must remain outside source control and user-visible logs.

## Storage

- Use the deployment platform's encrypted environment or secret store.
- Keep separate credentials for development, preview, and production.
- Grant each integration only the scopes and permissions it requires.
- Never commit `.env` files or copy secrets into documentation or issue reports.

## Runtime use

- Validate required configuration at startup or before the integration is used.
- Return a safe configuration error without revealing secret values.
- Redact authorization headers and tokens from request/response logs.
- Apply timeouts and bounded retries to external requests.

## Rotation and incident response

Rotate credentials through the provider's approved process. If a secret may be exposed, revoke it, issue a replacement, review access logs, and document the affected integration and time window.

## Production private API gate

All `/api/*` requests except `GET` and `HEAD` on `/api/health` require an `Authorization: Bearer <token>` header in production. Configure `ENTERPRISE_API_TOKEN` (32–512 random characters) in a server-only secret store. Missing or invalid configuration denies access. Do not bundle this token into the public React client or a `VITE_*` variable. Protected JSON requests are limited to 256 KiB and must not use compressed bodies.

The current frontend and backend are a prototype with illustrative WhatsApp conversations, not verified real WhatsApp sessions. Before production launch, replace the prototype with a user-authenticated backend-for-frontend, per-user authorization, and server-side sessions; do not add the shared secret to client JavaScript. Keep development servers private, and leave the loopback bypass disabled behind any reverse proxy or tunnel.

## Before using real customer data

- Verify inbound webhook signatures and reject replayed delivery IDs before processing. An API bearer token does not verify provider identity.
- Treat the finance endpoints as simulations; recording a payment does not prove settlement. Verify settlement with the provider, enforce idempotency, and authorize writes before using them for real transactions.
- Minimize the customer data sent to external AI services. Send only what is needed, avoid identity or financial documents, and establish consent, retention, and access controls for messages and diagnostics before deployment.
- In GitHub, require the enterprise verification check and an approving review on the default branch. Keep incident reports and any affected file locations private.
