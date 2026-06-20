# Participant Registry: DID `DataService` Well-Known Endpoint

## Background

This page documents one specific requirement of the onboarding
application's participant registry: how a participant advertises their
connector's Dataspace Protocol (DSP) support via their DID document.

This follows the [Dataspace Protocol](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/)
(DSP) specification, the same protocol implemented by [Eclipse Dataspace
Components (EDC)](https://projects.eclipse.org/projects/technology.edc)
and used across Catena-X / Gaia-X-style dataspaces.

## What to add to the DID

When registering as a participant, your DID document must include a
`DataService` entry that points to your connector's well-known
DSP version endpoint.

**Format:**

```
https://{connectorDspEndpoint}/api/v1/dsp/.well-known/dspace-version
```

Where `{connectorDspEndpoint}` is the base host (and optional subpath)
of your connector's DSP API.

## Why this endpoint exists

Before a consumer's connector starts a contract negotiation or catalog
request with your connector, it needs to know:

1. **Which versions of the Dataspace Protocol you support**, and
2. **The base path each version is served from.**

The `.well-known/dspace-version` endpoint answers both questions in one
unauthenticated call, so other participants can discover how to talk to
your connector before any handshake or credential exchange happens.

This is why the endpoint is **always unauthenticated** — it must be
reachable before trust has been established between the two parties.

## What the endpoint must return

A `GET` request to the well-known URL must return a JSON-LD object
listing the protocol versions you support and the root path for each:

```json
{
  "@context": "https://w3id.org/dspace/2025/1/context.jsonld",
  "protocolVersions": [
    {
      "version": "2025-1",
      "path": "/api/v1/dsp"
    }
  ]
}
```

- `version` — the DSP version tag you support.
- `path` — the absolute URL path segment under which all endpoints for
  that version are served.

A connector may list multiple supported versions if it needs to remain
backward-compatible with older consumers.

## Where this fits in the registration flow

1. Your connector exposes its DSP API (catalog, contract negotiation,
   transfer process endpoints) under a chosen path, e.g. `/api/v1/dsp`.
2. Your connector also exposes the well-known endpoint at
   `{base}/.well-known/dspace-version`, describing the path(s) above.
3. When you register with the participant registry / onboarding
   application, your DID document includes a `DataService` entry
   pointing to that well-known URL.
4. Other participants resolve your DID, find the `DataService` entry,
   call the well-known endpoint, and use the returned `path` to reach
   your actual DSP endpoints.

## References

- [Dataspace Protocol specification](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/)
- [Common Functionalities & HTTPS Binding (defines the well-known version endpoint)](https://docs.internationaldataspaces.org/ids-knowledgebase/dataspace-protocol/common-functionalities/common.protocol)