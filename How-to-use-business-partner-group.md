# How to Create Business Partner Group for Group Policy Scenario

## Create Business Partner Group

We can create Business Partner Group with BPN numbers, so we do not have to create same policy for different BPN numbers.

To create business partner group we have to use POST with: 

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/business-partner-groups
```

Use this part in body:

```json
{
  "@context": {
    "tx": "https://w3id.org/tractusx/v0.0.1/ns/"
  },
  "@id": "{BPN_NUMBER_01}",
  "tx:groups": "{GROUP_NAME}"
}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

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

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

So based on above steps we created `{GROUP_NAME}` with BPN numbers: `{BPN_NUMBER_01}` and `{BPN_NUMBER_02}`.

## Check the Business Partner Group

To check this use GET with this endpoint:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/business-partner-groups/{BPN_NUMBER_01}
```

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

And in response you will able to see: `{BPN_NUMBER_01}` with `{GROUP_NAME}`

## Create Group Access Policy

To create group access policy use POST with this endpoint:

```
https://{PROVIDER_CONNECTOR_URL}/management/v3/policydefinitions
```
With this body:

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

Use this part in Header:
- Key: `Content-Type` Value: `application/json`
- Key: `X-Api-Key` Value: `{PROVIDER_X_API_KEY}`

Then you have to use this `{ACCESS_POLICY}` in contract definition. 

### Based on above steps we created group policy for `{BPN_NUMBER_01}` and `{BPN_NUMBER_02}`. So, we do not have to create same policy individually for `{BPN_NUMBER_01}` and `{BPN_NUMBER_02}`.

## Documentation for Business Partner Group from Tractusx-edc

- [Only-let-a-Business-Partner-Group-pass](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/docs/usage/management-api-walkthrough/02_policies.md#:~:text=Only%20let%20a%20Business%20Partner%20Group%20pass)