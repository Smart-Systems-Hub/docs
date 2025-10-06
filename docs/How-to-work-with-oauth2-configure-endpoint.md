# How to create an asset if the provider's endpoint is secured with OAuth 2

If the provider's endpoint is secured with OAuth 2, the provider must store the `oauth2:clientSecretKey` in the vault. Then create the asset as follows:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/assets
```

Use the following as the request body:

```json
{
  "@context": {},
  "@type": "Asset",
  "@id": "{ASSET_ID}",
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "proxyPath": "true",
    "proxyQueryParams": "true",
    "baseUrl": "{BASE_URL}",
    "oauth2:tokenUrl": "{TOKEN_URL}",
    "oauth2:clientId": "{CLIENT_ID}",
    "oauth2:clientSecretKey": "{SECRET_NAME_FROM_VAULT}"
  },
  "properties": {
    "description": "{DESCRIPTION}"
  }
}
```

> Note: If you stored the secret in the vault under the name `client-secret`, then set `{SECRET_NAME_FROM_VAULT}` to `client-secret`.

Set the following headers:
- `Content-Type`: `application/json`
- `X-Api-Key`: `{PROVIDER_X_API_KEY}`

### All other steps (create policies, create a contract definition, request a catalog, obtain EDRs, request EDRs, start a transfer process, data transfer) remain the same

## To follow the complete Management API walkthrough, see:
- [Management API Overview](Management-API-Overview.md)

## Management API walkthrough introduction video
- [Management API Walkthrough Video](Management-API-Overview-video.md)
