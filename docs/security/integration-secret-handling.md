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