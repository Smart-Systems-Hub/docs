import useBaseUrl from '@docusaurus/useBaseUrl';

# Management API Overview

With the help of this document, you will gain an overview of how user can share data between DSI connector and Tractus-X connector.

Throughout this document, you will encounter several elements that need to be used, such as:

- `provider_url`
- `provider_did`
- `provider_dsp_endpoint`
- `consumer_url`
- `consumer_did`
- `x-api-key` for tractus-x connector
- `access-token-url` for dsi connector
- `client-id` for dsi connector
- `client-secret` for dsi connector

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

## Tractus-X as Provider

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

### Policies

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
    "@type": "Set"
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

#### Add access policy in provider

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
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "BusinessPartnerDID",
          "operator": "eq",
          "rightOperand": "{CONSUMER_DID}"
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

### Creating a Contract Definition

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

## DSI connector as Consumer

### Catalog

Send catalog request via using this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/api/management/v3/catalog/request
```

Use this part in body:

```json
{
  "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
    },
  "counterPartyId": "{PROVIDER_BPN}",
  "counterPartyAddress": "{PROVIDER_CONNECTOR_DSP_URL}",
  "protocol": "{SUPPORTED_TYPE}",
  "querySpec": {
    "offset": 0,
    "limit": 50
  }
}
```

Use this part in Authorization:
- Key: `access-token-url` Value: `{VALUE}`
- Key: `client-id` Value: `{VALUE}`
- Key: `client-secret` Value: `{VALUE}`
- Then use access token as Bearer token

In response you will get correct output.

### EDRs

#### Receiving the EDR

Use this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/api/management/v2/edrs
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
    "protocol": "{SUPPORTED_TYPE}",
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
- Key: `access-token-url` Value: `{VALUE}`
- Key: `client-id` Value: `{VALUE}`
- Key: `client-secret` Value: `{VALUE}`
- Then use access token as Bearer token

In response you will get correct output.

#### Retrieving EDR entries from the Consumer Control Plane

Use this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/api/management/v2/edrs/request
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
- Key: `access-token-url` Value: `{VALUE}`
- Key: `client-id` Value: `{VALUE}`
- Key: `client-secret` Value: `{VALUE}`
- Then use access token as Bearer token

In response you will get correct output.

#### Pull out the EDR

Use this URL with GET:

```
{CONSUMER_CONNECTOR_URL}/api/management/v2/edrs/{transferProcessId}/dataaddress
```

> Note: `{transferProcessId}` is obtained from the previous step

Use this part in Header:
- Key: `access-token-url` Value: `{VALUE}`
- Key: `client-id` Value: `{VALUE}`
- Key: `client-secret` Value: `{VALUE}`
- Then use access token as Bearer token

In response you will get correct output.

#### Use EDR for Data Access

Use GET with this URL:

```
{endpoint}
```

> Note: `{endpoint}` is obtained from the previous step

Use this part in Header:
- Key: `Authorization` Value: `{Bearer Token}`
  > Note: `{Bearer Token}` is obtained from the previous step

In response you will get the data which provider shared with consumer.

## DSI as Provider

> Note: For now these provider steps only possible for Smart-Systems-Hub developer. And this is possible via "SAP Integration Suite" GUI

To create asset, policies, and contract definitions Smart-System-Hub developer have to go Integration Suite > Design > Data Spaces.

### Create an Asset

User have to click on Create button in Assets section. 
![Create asset](/img/Create_asset.png)

Then please fill required information.
![Insert asset information](/img/Asset_information.png)

### Policies

User have to click on Create button in Policies. 
![Create Policies](/img/Create_policies.png)

Then please fill required information.
![Insert policy information](/img/Policy_information.png)

Create access policy and usage policy turn by turn from here.

### Creating a Contract Definition

User have to click on Create button in Contract Definitions. 
![Create Contract Definitions](/img/Contract_definition.png)

Then please fill required information.
![Insert contract definition information](/img/Contract_definition_information.png)

## Tractus-X connector as Consumer

### Catalog

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

### EDRs

#### Receiving the EDR

Use this URL with POST:

```
{CONSUMER_CONNECTOR_URL}/management/v3/edrs
```

Use this part in body:

```json
{
  "@context": [
    "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    "odrl": "http://www.w3.org/ns/odrl/2/",
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  ],
  "@type": "ContractRequest",
  "counterPartyAddress": "{PROVIDER_CONNECTOR_DSP_URL}",
  "protocol": "{SUPPORTED_TYPE}",
  "policy": {
    "@id": "{OFFER_ID}",
    "@type": "odrl:Offer",
    "odrl:assigner": {"@id": "{PROVIDER_BPN}"},
    "odrl:target": {"@id": "{ASSET_ID}"},
    "odrl:permission": {
      "odrl:action": { "@id": "USE" },
      "odrl:constraint": {
        "odrl:leftOperand": { "@id": "tx:BusinessPartnerNumber" },
        "odrl:operator": { "@id": "odrl:eq" },
        "odrl:rightOperand": "{CONSUMER-BPN}"
      }
    },
    "odrl:prohibition": [],
    "odrl:obligation": []
  }
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

## Postman collection

<a
  href={useBaseUrl('/postman_collection/DSI_connector_and_Tractus-X_connector_postman_collection.json')}
  download
>
  Download Postman Collection for Management API Walkthrough
</a>

## Documentation for Provider steps from Integration suite

- [Integration suite](https://help.sap.com/docs/integration-suite/sap-integration-suite/data-spaces)
