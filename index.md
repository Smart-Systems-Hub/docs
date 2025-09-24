# Smart Systems Hub - Manufacturing-X Learn and Explore Environment

### General Information:

- [Manufacturing-X](https://www.smart-systems-hub.de/en/manufacturing-x)
- [FAQ](#faq)

### Tractus-X EDC Connector:

- [Management API Walkthrough](Management-API-Overview.md)
- [Management API Walkthrough Video](Management-API-Overview-video.md)
- [How to create an asset if the provider's endpoint is secured with OAuth 2](How-to-work-with-oauth2-configure-endpoint.md)
- [How to Create a Business Partner Group for Group Policy Scenario](How-to-use-business-partner-group.md)
- [How to Create a Business Partner Group for Group Policy Scenario Video](Business-partner-group-video.md)
- [How to use Dismantler Scenario in Usage/Contract Policy](How-to-use-Dismantler-Scenario-in-Policy.md)
- [How to use Dismantler Scenario in Usage/Contract Policy Video](Dismantler-policy-scenario-video.md)

### Factory-X EDC Connectors:

- [Management API Walkthrough](Management-API-Overview-FX-connectors.md)

### Central vault:
- [How to use Central vault](How-to-use-central-vault.md)

### Asset Administration Shell (AAS):
- [Asset Administration Shell Introduction](Asset-Administration-Shell-Introduction.md)

# FAQ

<details>
  <summary>What is the role of Smart Systems Hub for Manufacturing-X?</summary>
  Smart Systems Hub supports useres to onboarding for Manufacturing-X based on Explore & Learn environment. Learn more: <a href="https://www.smart-systems-hub.de/en/manufacturing-x">Manufacturing-X</a>.
</details>

<details>
  <summary>Is it possible to deploy a connector in my own environment?</summary>
  Yes, it's absolutely possible. Smart Systems Hub provides wallets and identities that you can use to deploy a Tractus-X EDC or a Factory-X EDC in your own environment.
</details>

<details>
  <summary>Why is the catalog request not working?</summary>
  Many users encounter a 502 Bad Gateway with a response like:
  ```json
    [

        {

            "message": "Unable to obtain credentials: Failed to fetch client secret from the vault with alias: edc-client-secret",

            "type": "BadGateway",

            "path": null,

            "invalidValue": null

        }

    ]
  ```
  This usually happens because the client secret is missing in the vault, or the connector cannot read secrets from the vault. Please verify that the secret exists in the vault and that the connector has access to it.
</details>