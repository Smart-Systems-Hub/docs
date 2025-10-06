---
id: faq
title: FAQ
slug: /faq
sidebar: faqSidebar
---

# FAQ

<details>
  <summary>What is the role of Smart Systems Hub for Manufacturing-X?</summary>
  <p>Smart Systems Hub supports users with onboarding to Manufacturing-X based on the Explore and Learn environment. Learn more: [Manufacturing-X](https://www.smart-systems-hub.de/en/manufacturing-x).</p>
</details>

<details>
  <summary>Which connectors does Smart Systems Hub provide?</summary>
  <p>Smart Systems Hub provides the following connectors:</p>
  <ul>
    <li>Tractus-X EDC</li>
    <li>Factory-X EDC</li>
  </ul>
</details>

<details>
  <summary>Is it possible to deploy a connector in my own environment?</summary>
  <p>Yes, it's absolutely possible. Smart Systems Hub provides wallets and identities that you can use to deploy a Tractus-X EDC or a Factory-X EDC in your own environment.</p>
</details>

<details>
  <summary>Which policies can a user create?</summary>
  <p>You typically need to define Usage and Access policies. See: [How to create policies](./Management-API-Overview#policies-section).</p>

  <p><strong>Can I create a group policy?</strong></p>
  <p>Yes, it's absolutely possible. See: [How to Create a Business Partner Group for Group Policy Scenarios](How-to-use-business-partner-group.md).</p>

  <p><strong>Can I create a policy with a Dismantler constraint?</strong></p>
  <p>Yes, it's absolutely possible. See: [How to use Dismantler Scenario in Usage/Contract policy](How-to-use-Dismantler-Scenario-in-Policy.md).</p>
</details>

<details>
  <summary>Why is the catalog request not working?</summary>
  <p>Below are common causes and how to resolve them:</p>

  <p><strong>Cause 1: Missing client secret or vault access</strong></p>
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
  <p>Ensure the client secret exists in the vault and that the connector has permission to read it.</p>

  <p><strong>Cause 2: Wrong DSP URL in the counterparty address</strong></p>
```json
[
  {
    "message": "<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=ISO-8859-1\"/>\n<title>Error 404 Not Found</title>\n</head>\n<body><h2>HTTP ERROR 404 Not Found</h2>\n<table>\n<tr><th>URI:</th><td>/api/v1/dsp/catalog/request</td></tr>\n<tr><th>STATUS:</th><td>404</td></tr>\n<tr><th>MESSAGE:</th><td>Not Found</td></tr>\n<tr><th>SERVLET:</th><td>EDC-default</td></tr>\n</table>\n\n</body>\n</html>\n",
    "type": "BadGateway",
    "path": null,
    "invalidValue": null
  }
]
```
  <p>Verify you are using the correct DSP URL for the counterparty.</p>

  <p><strong>Cause 3: BPN/DID not registered in BDRS or BDRS unavailable</strong></p>
```json
[
  {
    "message": "Unable to obtain credentials: Empty optional",
    "type": "BadGateway",
    "path": null,
    "invalidValue": null
  }
]
```
  <p>Confirm that the BPN and its corresponding DID entry are present in the BDRS and that the BDRS service is reachable.</p>

  <p><strong>You can also follow this document to make a catalog request: [How to make a catalog request](./Management-API-Overview#catalog-section).</strong></p>
</details>

<details>
  <summary>Why is Data Access not working?</summary>
  <p>After the EDR has been negotiated and stored, you can fetch data. Common errors include HTTP 500 and 403. Below are common causes and how to resolve them:</p>

  <p><strong>Cause 1: Provider endpoint is not working correctly</strong></p>
  <p>Ensure you set the correct provider base URL during asset creation and that the endpoint is reachable; otherwise, you may receive a 500 Internal Server Error.</p>

  <p><strong>Cause 2: Provider endpoint is not working correctly</strong></p>
```html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1" />
    <title>Error 500 Internal Server Error</title>
</head>
<body>
    <h2>HTTP ERROR 500 Internal Server Error</h2>
    <table>
        <tr>
            <th>URI:</th>
            <td>/api/public</td>
        </tr>
        <tr>
            <th>STATUS:</th>
            <td>500</td>
        </tr>
        <tr>
            <th>MESSAGE:</th>
            <td>Internal Server Error</td>
        </tr>
        <tr>
            <th>SERVLET:</th>
            <td>EDC-public</td>
        </tr>
    </table>
</body>
</html>
```
  <p>You may see the above 500 response when the provider endpoint is secured with OAuth 2 but the asset was created without OAuth 2 credentials. Create the asset with OAuth 2 credentials configured. See: [How to create an asset if the provider’s endpoint is secured with OAuth 2](How-to-work-with-oauth2-configure-endpoint.md).</p>

  <p><strong>Cause 3: Token has expired</strong></p>
```json
{
  "errors": [
    "Token has expired (exp)"
  ]
}
```
  <p>This typically results in a 403 response. Access tokens expire after 5 minutes; generate a new token and include it in the Authorization header.</p>
</details>

<details>
  <summary>Is it possible to request a refreshed database for the connector?</summary>
  <p>Yes. Please contact Smart Systems Hub to request a database refresh for your connector; they will provide a refreshed database as needed.</p>
</details>

<details>
  <summary>Can a user delete unwanted secrets from the vault?</summary>
  <p>Yes. Contact Smart Systems Hub to request an update to your policy that grants delete permissions. Once updated, you can delete the unwanted secrets from the vault.</p>
</details>
