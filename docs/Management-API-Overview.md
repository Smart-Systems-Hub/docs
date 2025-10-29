# Management API Overview

With the help of this document, you will gain an overview of how a provider can share data with a consumer via Tractus-X EDC.

Throughout this document, you will encounter several elements that need to be used, such as:

- `provider_url`
- `provider_bpn`
- `provider_dsp_endpoint`
- `consumer_url`
- `consumer_bpn`
- `x-api-key` for provider connector
- `x-api-key` for consumer connector

No worries---you can get all the required information within the Smart Systems Hub -- Learn and Explore environment.

To follow the Management API walkthrough, both the provider and consumer will need to complete a few steps, which are detailed in the following sections.

## Provider

1. Create an Asset
2. Policies
   - Create Usage Policy
   - Create Access Policy
3. Create a Contract Definition

## Consumer

1. Fetching a Provider's Catalog
2. EDRs
   - Receiving the EDR
   - Retrieving EDR entries from the Consumer Control Plane
   - Pull out the EDR
   - Use EDR for Data Access

# Management API Walkthrough

## Provider

### Create an Asset

Use this URL with POST:

```
{PROVIDER_CONNECTOR_URL}/management/v3/assets
```

Use this part in body:

```json
{
  "@context": {},
  "@type": "Asset",
  "@id": "{ASSET_ID}",
  "properties": {
    "description": "{DESCRIPTION_FOR_ASSET}"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "{SUPPORTED_TYPE}",
    "baseUrl": "{API_PUBLIC_URL}"
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

#### If the provider's endpoint is secured with OAuth 2, then please create asset like this:
[How to create an asset if the provider's endpoint is secured with OAuth 2](How-to-work-with-oauth2-configure-endpoint.md)

### Policies {#policies-section}

#### Add Access policy in provider

Use this URL with POST:

```
{PROVIDER_CONNECTOR_URL}/management/v3/policydefinitions
```

Use this part in body:

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
    "@type": "Set"
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

#### Add Usage/contract policy in provider (Define how the data can be used)

Use this URL with POST:

```
{PROVIDER_CONNECTOR_URL}/management/v3/policydefinitions
```

Use this part in body:

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
  "@id": "{USAGE_POLICY_ID}",
  "policy": {
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "BusinessPartnerNumber",
          "operator": "eq",
          "rightOperand": "{CONSUMER_BPN}"
        }
      }
    ]
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

#### If user want to create Business partner group policy then please follow the steps from here: 
[How to Create Business Partner Group for Group Policy Scenario](How-to-use-business-partner-group.md)

#### If user want to use Dismantler in policy then please follow the steps from here:
[How to use Dismantler Scenario in Usage/Contract policy](How-to-use-Dismantler-Scenario-in-Policy.md)

### Creating a Contract Definition {#contractdefinition-section}

Use this URL with POST:

```
{PROVIDER_CONNECTOR_URL}/management/v3/contractdefinitions
```

Use this part in body:

```json
{
  "@context": {},
  "@id": "{CONTRACT_DEFINITION_ID}",
  "@type": "ContractDefinition",
  "accessPolicyId": "{USAGE_POLICY_ID}",
  "contractPolicyId": "{ACCESS_POLICY_ID}",
  "assetsSelector": {
    "@type": "CriterionDto",
    "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
    "operator": "=",
    "operandRight": "{ASSET_ID}"
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

## Consumer

### Catalog {#catalog-section}

Send catalog request via using this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/management/v3/catalog/request
```

Use this part in body:

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "protocol": "dataspace-protocol-http",
  "counterPartyAddress": "{PROVIDER_CONNECTOR_DSP_URL}",
  "counterPartyId": "{PROVIDER_BPN}",
  "querySpec": {
    "offset": 0,
    "limit": 50
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{CONSUMER_X_API_KEY}`

In response you will get correct output.

### EDRs {#EDRS-section}

#### Receiving the EDR

Use this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/management/v3/edrs
```

Use this part in body:

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
          "leftOperand": "tx:BusinessPartnerNumber",
          "operator": "eq",
          "rightOperand": "{CONSUMER_BPN}"
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

> Note: `{OFFER_ID}` is obtained from the previous step (catalog request)

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{CONSUMER_X_API_KEY}`

In response you will get correct output.

#### Retrieving EDR entries from the Consumer Control Plane

Use this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/management/v3/edrs/request
```

Use this part in body:

```json
{
  "@context": {
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "QuerySpec",
  "filterExpression": [
    {
      "operandLeft": "assetId",
      "operator": "=",
      "operandRight": "{ASSET_ID}"
    }
  ]
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{CONSUMER_X_API_KEY}`

In response you will get correct output.

#### Pull out the EDR

Use this URL with GET:

```
{CONSUMER_CONNECTOR_URL}/management/v3/edrs/{transferProcessId}/dataaddress
```

> Note: `{transferProcessId}` is obtained from the previous step

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{CONSUMER_X_API_KEY}`

In response you will get correct output.

#### Use EDR for Data Access

Use GET with this URL:

```
{endpoint}
```

> Note: `{endpoint}` is obtained from the previous step

Use this part in Header:
- Key: `Authorization` Value: `{authorization}`
  > Note: `{authorization}` is obtained from the previous step

In response you will get the data which provider shared with consumer.

## Documentation for Management API Walkthrough

- [Tractusx-edc-management-api-walkthrough](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/usage/management-api-walkthrough)
- [Tractusx-edc-swagger-api-document](https://app.swaggerhub.com/apis/eclipse-tractusx-bot/tractusx-edc/0.9.0)

## Management API Walkthrough Introduction Video
- [Management API Walkthrough Video](Management-API-Overview-video.md)

## Management API Walkthrough with Tractus-X 0.11.0 version
- [Management API Walkthrough](Management-API-Overview-0-11-0.md)
