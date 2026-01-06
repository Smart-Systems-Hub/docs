# TX-FX EDC Compatibility

This document explains the compatibility between Tractus-X EDC and Factory-X EDC.

To ensure compatibility between Tractus-X EDC and Factory-X EDC, users must use Tractus-X EDC version 0.11.0 or higher, because starting with this version Tractus-X EDC is not dependent on the BDRS server.

## Credentials scenario for Tractus-X EDC and Factory-X EDC

The following diagram shows the credentials scenario:

![Credential-scenario](/img/Credentials-scenario-for-Tractus-X-EDC-and-Factory-X-EDC.png)

If this credentials scenario is not met, offers should not be visible during a catalog request.

## Current approach by Smart Systems Hub for Tractus-X EDC and Factory-X EDC

Smart Systems Hub is currently working to validate compatibility between Tractus-X EDC and Factory-X EDC. The current approach is illustrated below:

![Architecture for TX-FX compatibility](/img/Architecture-for-TX-FX-compatibility.png)

As the architecture shows, there is a single trustedIssuer. This trustedIssuer issues MembershipCredential, BpnCredential, and DataExchangeCredential to the Tractus-X EDC wallet, and issues MembershipCredential to the Factory-X EDC wallet. 

In this scenario, since there is one trustedIssuer and cx:MembershipCredential is issued to both wallets, in principle there should be no offer ID in the catalog request. However, an offer ID is still present in the catalog response, so we created a bug ticket: [issue](https://github.com/eclipse-tractusx/tractusx-edc/issues/2379#issuecomment-3513000047)

These are the steps completed by Smart Systems Hub so far: 
![Steps](/img/Steps-done-by-smart-systems-hub.png)

As the diagram shows, we are still facing some issues that we are working to resolve. 