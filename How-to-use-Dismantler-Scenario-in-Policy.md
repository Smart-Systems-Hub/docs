# How to use Dismantler Scenario in Usage/Contract policy

First user have to inform Smart Systems Hub that they want to use Dismantler so Smart Systems Hub will add DismantlerCredential during creation of credential.

After that user can follow this steps to use Dismantler during policy creation.

There are two ways to use Dismantler during policy creation (without BPN number and with BPN number)

## 1. Dismantler without BPN number

In this way provider can share his data with any consumer who have DismantlerCredential without specifing the BPN number.

To achive this user have to follow these steps during policy creation.

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
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "Dismantler",
          "operator": "eq",
          "rightOperand": "active"
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
  "@id": "{ACESS_POLICY_ID}}",
  "policy": {
    "@type": "Set"
  }
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

In response you will get correct output.

### Then use this `{USAGE_POLICY_ID}` and `{ACCESS_POLICY_ID}` in Create contract definition.

## 2. Dismantler with BPN number

In this way provider can share his data with consumer who have DismantlerCredential and with specifying the BPN number.

To achive this user have to follow these steps during policy creation.

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
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "Dismantler",
          "operator": "eq",
          "rightOperand": "active"
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
    {      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"    }  ],  "@type": "PolicyDefinition",
  "@id": "{ACCESS_POLICY_ID}",
  "policy": {
    "@type": "Set",
    "permission": [
      {        "action": "use",
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

### Then use this `{USAGE_POLICY_ID}` and `{ACCESS_POLICY_ID}` in Create contract definition.

## Documentation for Dismantler in Tractusx-edc

- [How-to-use-dismantler](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md#:~:text=the%20Traceability%20Credential.-,Scenario%202,-Partner%201%20wants)

