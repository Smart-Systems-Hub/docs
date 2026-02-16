import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';

# Releases

This page provides a structured overview of new Tractus-X EDC and Factory-X releases relevant for Smart Systems Hub users.

<Admonition type="info" title="Transparency Statement">
We summarize key highlights for better readability and orientation.  
For full technical details, commits, and migration instructions, please always refer to the official upstream GitHub release notes.
</Admonition>

## Tractus-X EDC 0.11.3

**Release Date:** November 2025  
**Smart Systems Hub repository Source:** 
<Link
  to="https://github.com/Smart-Systems-Hub/helm-charts/releases/tag/tractusx-connector-0.11.3"
  target="_blank"
  rel="noopener noreferrer"
>
  Smart Systems Hub releases ↗
</Link>


### Bugfixes
- Fixed security problem of x-api-key

## Factory-X EDC 0.1.4

**Release Date:** November 2025  
**Smart Systems Hub repository Source:** 
<Link
  to="https://github.com/Smart-Systems-Hub/helm-charts/releases/tag/factoryx-connector-0.1.4"
  target="_blank"
  rel="noopener noreferrer"
>
  Smart Systems Hub releases ↗
</Link>


### Bugfixes
- Fixed security problem of x-api-key

## Tractus-X EDC 0.11.2

**Release Date:** October 2025  
**Smart Systems Hub repository Source:** 
<Link
  to="https://github.com/Smart-Systems-Hub/helm-charts/releases/tag/tractusx-connector-0.11.2"
  target="_blank"
  rel="noopener noreferrer"
>
  Smart Systems Hub releases ↗
</Link>


### Improvements
- Used average utilization for autoscaler

## Tractus-X EDC 0.11.1

**Release Date:** October 2025  
**Smart Systems Hub repository Source:** 
<Link
  to="https://github.com/Smart-Systems-Hub/helm-charts/releases/tag/tractusx-connector-0.11.1"
  target="_blank"
  rel="noopener noreferrer"
>
  Smart Systems Hub releases ↗
</Link>


### Bugfixes
- Fixed version problem for Autoscaler

## Tractus-X EDC 0.11.0

**Release Date:** October 2025  
**Upstream Source:**  
<Link
  to="https://github.com/eclipse-tractusx/tractusx-edc/releases/tag/0.11.0"
  target="_blank"
  rel="noopener noreferrer"
>
  Official GitHub Release ↗
</Link>

**Smart Systems Hub repository Source:** 
<Link
  to="https://github.com/Smart-Systems-Hub/helm-charts/releases/tag/tractusx-connector-0.11.0"
  target="_blank"
  rel="noopener noreferrer"
>
  Smart Systems Hub releases ↗
</Link>

### What’s New — Main Features
The 0.11.0 release brings several important upgrades, especially related to protocol support, policy handling, transfer modes, and observability.

### Protocol & Standards Support
- DSP version 2025-1 support with DIDs:
Adds support for the DSP (Data Space Protocol) version 2025-1, including use of Decentralized Identifiers (DIDs) for connector identity and negotiable version selection.

- DCP 1.0 support:
The connector now supports DCP (Decentralized Credential Presentation) v1.0 for interactions with wallets, aligning with the supported protocol used by available wallet implementations.

### Policies & Access
- New Policy Schema support:
Implements validated policy creation and contract negotiation logic for the updated policy options defined in the CX-0152 specification.

- Default Scope for Catalog Requests:
Extends access during catalog queries to include BPN and Data Exchange Governance Credentials for providers, enabling more fine-grained access logic but requiring 0.11.0 on both sides of the exchange.

<Admonition type="warning" title="Compatibility Notice">
Both provider and consumer connectors may need to run 0.11.0  
to ensure compatibility with updated catalog scopes.
</Admonition>

### Observability & Logging
- Structured Logging:
Log output is now emitted in structured JSON format, aimed at easier ingestion and analysis by observability tooling.
- Domain Events in Logs:
Relevant domain events (e.g., contract negotiation completion, transfer starts) can now be exported to an OpenTelemetry collector for metrics/tracing pipelines.

### Documentation
- How to migrate to 0.11.0 : 
[Migrate to 0.11.0](How-to-migrate-to-0-11-0.md)

- Management API walkthrough for 0.11.0 connector:
[Management API Walkthorough](Management-API-Overview-0-11-0.md)



