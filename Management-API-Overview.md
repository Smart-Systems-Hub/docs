# Management API Overview

With the help of this document, you will gain an overview of how a
provider can share data with a consumer via Tractus-X EDC.

Throughout this document, you will encounter several elements that need
to be used, such as:

- provider_url

- provider_bpn

- provider_dsp_endpoint

- consumer_url

- consumer_bpn

- x-api-key for provider connector

- x-api-key for consumer connector

No worries---you can get all the required information within the Smart
Systems Hub -- Learn and Explore environment.

To follow the Management API walkthrough, both the provider and consumer
will need to complete a few steps, which are detailed in the following
sections.

## Provider:

1)  Create an Asset

2)  Policies

    a.  Create Usage Policy

    b.  Create Access Policy

3)  Create a Contract Definition

## Consumer:

1)  Fetching a Provider's Catalog

2)  EDRs

    a.  Receiving the EDR

    b.  Retrieving EDR entries from the Consumer Control Plane

    c.  Pull out the EDR

    d.  Use EDR for Data Access

# **Management-api-walkthrough**

## Provider

### Create an Asset

Use this url with POST:

`{{PROVIDER_CONNECTOR_URL}}/management/v3/assets`

Use this part in body:

```
{

  \"@context\": {},

  \"@type\": \"Asset\",

  \"@id\": \"{{ASSET_ID}}\",

  \"properties\": {

        \"description\": \"{{DESCRIPTION FOR ASSET}}\"

  },

  \"dataAddress\": {

    \"@type\": \"DataAddress\",

    \"type\": \"{{SUPPORTED_TYPE}}\"

    \"baseUrl\": \"{{API_PUBLICK_URL}}\"

  }

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{PROVIDER_X_API_KEY}}`

In response you will get correct output.

### Policies:

#### Add Usage/contract policy in provider (Define how the data can be used):

Use this url with POST:

`{{PROVIDER_CONNECTOR_URL}}/management/v3/policydefinitions`

Use this part in body:

```
{

  \"@context\": \[

    \"https://w3id.org/tractusx/edc/v0.0.1\",

    \"http://www.w3.org/ns/odrl.jsonld\",

    {

      \"@vocab\": \"https://w3id.org/edc/v0.0.1/ns/\"

    }

  \],

  \"@type\": \"PolicyDefinition\",

  \"@id\": \"{{USAGE_POLICY_ID}}\",

  \"policy\": {

    \"@type\": \"Set\"

  }

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{PROVIDER_X_API_KEY}}`

In response you will get correct output.

#### Add access policy in provider

Use this url with POST:

`{{PROVIDER_CONNECTOR_URL}}/management/v3/policydefinitions`

Use this part in body:

```
{

  \"@context\": \[

    \"https://w3id.org/tractusx/edc/v0.0.1\",

    \"http://www.w3.org/ns/odrl.jsonld\",

    {      \"@vocab\": \"https://w3id.org/edc/v0.0.1/ns/\"    }  \],
 \"@type\": \"PolicyDefinition\",

  \"@id\": \"{{ACCESS_POLICY_ID}}\",

  \"policy\": {

    \"@type\": \"Set\",

    \"permission\": \[

      {        \"action\": \"use\",

        \"constraint\": {

          \"leftOperand\": \"BusinessPartnerNumber\",

          \"operator\": \"eq\",

          \"rightOperand\": \"{{CONSUMER_BPN}}\"

        }

      }

    \]

  }

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{PROVIDER_X_API_KEY}}`

In response you will get correct output.

### **Creating a Contract Definition**

Use this url with POST:

`{{PROVIDER_CONNECTOR_URL}}/management/v3/contractdefinitions`

Use this part in body

```
{

  \"@context\": {},

  \"@id\": \"{{CONTRACT_DEFINITION_ID}}\",

  \"@type\": \"ContractDefinition\",

  \"accessPolicyId\": \"{{USAGE_POLICY_ID}}\",

  \"contractPolicyId\": \"{{ACCESS_POLICY_ID}}\",

  \"assetsSelector\": {

    \"@type\": \"CriterionDto\",

    \"operandLeft\": \"https://w3id.org/edc/v0.0.1/ns/id\",

    \"operator\": \"=\",

    \"operandRight\": \"{{ASSET_ID}}\"

  }

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{PROVIDER_X_API_KEY}}`

In response you will get correct output.

## Consumer

### Catalog

Send catalog request via using this url with POST:

`{{CONSUMER_CONNECTOR_URL}}/management/v3/catalog/request`

Use this part in body:

```
{

    \"@context\": {

      \"@vocab\": \"https://w3id.org/edc/v0.0.1/ns/\"

    },

    \"protocol\": \"dataspace-protocol-http\",

    \"counterPartyAddress\": \"{{PROVIDER_CONNECTOR_DSP_URL}}\",

  \"counterPartyId\": \"{{PROVIDER_BPN}}\",

    \"querySpec\": {

    \"offset\": 0,

    \"limit\": 50

  }

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{CONSUMER_X_API_KEY}}`

In response you will get correct output.

### EDRs

#### Receiving the EDR

Use this url with POST:

`{{CONSUMER_CONNECTOR_URL}}/management/v3/edrs`

Use this part in body:

```
{

    \"@context\": \[

        \"https://w3id.org/tractusx/policy/v1.0.0\",

        \"http://www.w3.org/ns/odrl.jsonld\",

        {

            \"@vocab\": \"https://w3id.org/edc/v0.0.1/ns/\",

            \"tx\": \"https://w3id.org/tractusx/v0.0.1/ns/\"

        }

    \],

    \"@type\": \"ContractRequest\",

    \"counterPartyAddress\": \"{{PROVIDER_CONNECTOR_DSP_URL}}\",

    \"protocol\": \"dataspace-protocol-http\",

    \"policy\": {

        \"@id\": \"{{OFFER_ID}}\",

        \"@type\": \"Offer\",

        \"assigner\": \"{{PROVIDER_BPN}}\",

        \"permission\": \[

            {

                \"action\": \"use\",

                \"constraint\": {

                    \"leftOperand\": \"tx:BusinessPartnerNumber\",

                    \"operator\": \"eq\",

                    \"rightOperand\": \"{{CONSUMER_BPN}}\"

                }

            }

        \],

        \"prohibition\": \[\],

        \"obligation\": \[\],

        \"target\": \"{{ASSET_ID}}\"

    },

    \"callbackAddresses\": \[\]

}
```

\*`{{OFFER_ID}}`: You got from previous step (catalog request)

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{CONSUMER_X_API_KEY}}`

In response you will get correct output.

#### Retrieving EDR entries from the Consumer Control Plane

Use this url with POST:

`{{CONSUMER_CONNECTOR_URL}}/management/v3/edrs/request`

Use this part in body:

```
{

    \"@context\": {

        \"@vocab\": \"https://w3id.org/edc/v0.0.1/ns/\"

    },

    \"@type\": \"QuerySpec\",

    \"filterExpression\": \[

        {

            \"operandLeft\": \"assetId\",

            \"operator\": \"=\",

            \"operandRight\": \"{{ASSET_ID}}\"

        }

    \]

}
```

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{CONSUMER_X_API_KEY}}`

In response you will get correct output.

#### Pull out the EDR:

Use this url with GET:

`{{CONSUMER_CONNECTOR_URL}}/management/v3/edrs/{{transferProcessId}}/dataaddres`

\*`transferProcessId` : You got from previous step

Use this part in Header:

- Key: `Content-Type` Value: `application/json`

- Key: `X-Api-Key` Value: `{{CONSUMER_X_API_KEY}}`

In response you will get correct output.

#### Use EDR for Data Access:

Use GET with this url:

`{{endpoint}}`

\*`{{endpoint}}`: You got from previous step

Use this part in Header:

- Key: `Authorization Value`

  - \* `{{authorization}}` : You got from previous step

In response you will get the data which provider shared with consumer

# **Documentation for Management API Walkthrough:**

### Tractusx-edc-management-api-walkthrough: <https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/usage/management-api-walkthrough> {#tractusx-edc-management-api-walkthrough-httpsgithub.comeclipse-tractusxtractusx-edctreemaindocsusagemanagement-api-walkthrough}

### Tractusx-edc-swagger-api-document: <https://app.swaggerhub.com/apis/eclipse-tractusx-bot/tractusx-edc/0.9.0> {#tractusx-edc-swagger-api-document-httpsapp.swaggerhub.comapiseclipse-tractusx-bottractusx-edc0.9.0}
