# How to Create a Business Partner Group for Group Policy Scenarios

## Creating a Business Partner Group

You can create a Business Partner Group using BPN numbers, allowing you to apply the same policy to multiple BPNs without having to create separate policies for each one.

To create a Business Partner Group, send a POST request to:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/business-partner-groups
```

Use the following in the request body:

```json
{
  "@context": {
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  },
  "@id": "{BPN_NUMBER_01}",
  "tx:groups": "{GROUP_NAME}"
}
```

Set the following headers:
- `Content-Type`: `application/json`
- `X-Api-Key`: `{PROVIDER_X_API_KEY}`

Then use POST with same point: `https://{PROVIDER_CONNECTOR_URL}/management/v3/business-partner-groups` to add other BPN number in same group.

With this body:

```json
{
  "@context": {
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  },
  "@id": "{BPN_NUMBER_02}",
  "tx:groups": "{GROUP_NAME}"
}
```

Set the same headers as above.

Based on these steps, you have now created the group `{GROUP_NAME}` with the BPN numbers `{BPN_NUMBER_01}` and `{BPN_NUMBER_02}`.

## Checking the Business Partner Group

To verify the group, send a GET request to:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/business-partner-groups/{BPN_NUMBER_01}
```

With the same headers as above.

In the response, you will see `{BPN_NUMBER_01}` associated with `{GROUP_NAME}`.

## Creating a Group Access Policy

To create a group access policy, send a POST request to:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/policydefinitions
```

With the following request body:

```json
{
  "@context": [
    "https://w3id.org/tractusx/edc/v0.0.1",
    "http://www.w3.org/ns/odrl.jsonld",
    {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
    }
  ],
  "@type": "PolicyDefinition",
  "@id": "{ACCESS_POLICY_ID}",
  "policy": {
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "BusinessPartnerGroup",
          "operator": "eq",
          "rightOperand": "{GROUP_NAME}"
        }
      }
    ]
  }
}
```

Set the same headers as above.

By following these steps, you have created a group policy for `{BPN_NUMBER_01}` and `{BPN_NUMBER_02}`. This means you do not need to create individual policies for each BPN.

You will then need to use this `{ACCESS_POLICY}` in your contract definition. To create a contract definition, follow the steps described here:
- [Creating a Contract Definition](./Management-API-Overview#contractdefinition-section)

On the consumer side, users should follow the same steps for catalog requests as described here:
- [Catalog request](./Management-API-Overview#catalog-section)

## EDRs (Endpoint Data References)

### Receiving the EDR

To receive the EDR, send a POST request to:

```
{CONSUMER_CONNECTOR_URL}/management/v3/edrs
```

With the following request body:

```json
{
  "@context": [
    "https://w3id.org/tractusx/policy/v1.0.0",
    "http://www.w3.org/ns/odrl.jsonld",
    {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
      "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
    }
  ],
  "@type": "ContractRequest",
  "counterPartyAddress": "{PROVIDER_CONNECTOR_DSP_URL}",
  "protocol": "dataspace-protocol-http",
  "policy": {
    "@id": "{OFFER_ID}",
    "@type": "Offer",
    "assigner": "{PROVIDER_BPN}",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "tx:BusinessPartnerGroup",
          "operator": "eq",
          "rightOperand": "{GROUP_NAME}"
        }
      }
    ],
    "prohibition": [],
    "obligation": [],
    "target": "{ASSET_ID}"
  },
  "callbackAddresses": []
}
```

> **Note:** `{OFFER_ID}` is obtained from the catalog request.

Set the following headers:
- `Content-Type`: `application/json`
- `X-Api-Key`: `{CONSUMER_X_API_KEY}`

You will receive the appropriate response.

For the remaining EDR steps—retrieving EDR entries from the Consumer Control Plane, extracting the EDR, and using the EDR for data access—please follow the steps described here:
- [Remaining steps of EDRs](./Management-API-Overview#EDRS-section)

## For a complete Management API walkthrough, please refer to:
- [Management API Overview](Management-API-Overview.md)

## Management API Walkthrough Introduction Video
- [Management API Walkthrough Video](Management-API-Overview-video.md)

## Business Partner Group Introduction Video
[How to Create a Business Partner Group for Group Policy Scenario Video](Business-partner-group-video.md)

## Documentation for Business Partner Group from TractusX EDC

- [Only let a Business Partner Group pass](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md#:~:text=Only%20let%20a%20Business%20Partner%20Group%20pass)
