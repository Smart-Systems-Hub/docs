# How to Deploy EDC in Your Own Environment

This document provides an overview of how to deploy EDC in your own environment.

## How to Deploy Tractus-X EDC

To deploy Tractus-X EDC, you will need a wallet and credentials. To obtain these, please contact Smart Systems Hub. They will provide the following:

- `participant.id`  
- `iatp.id`  
- `iatp.trustedIssuer`  
- `iatp.sts.dim.url`  
- `iatp.sts.oauth.token_url`  
- `iatp.sts.oauth.client.id`  
- `iatp.sts.oauth.client.secret_alias`  
- `controlplane.bdrs.server.url`  

> **Note:** Tractus-X EDC expects to find `iatp.sts.oauth.client.secret_alias` under HashiCorp at `secret/client-secret`.

To deploy Tractus-X EDC, you can use different approaches:

### 1. Use Official Charts from the Tractus-X EDC GitHub Repository

Tractus-X EDC is an open-source project that provides pre-built control and data plane Docker images, and Helm charts, for the Eclipse DataSpace Connector Project.

Please refer to the [Tractusx-EDC README](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/charts/tractusx-connector) for deployment steps.

You can find the `values.yaml` file here: [values.yaml](https://github.com/eclipse-tractusx/tractusx-edc/blob/main/charts/tractusx-connector/values.yaml). Update the following values:

- Add your **BPN Number** to `participant.id` ([example](https://github.com/eclipse-tractusx/tractusx-edc/blob/cbe28ef483ea7787f90cecb0058d9913eb518316/charts/tractusx-connector/values.yaml#L44))
- Add your **DID** to `iatp.id` ([example](https://github.com/eclipse-tractusx/tractusx-edc/blob/cbe28ef483ea7787f90cecb0058d9913eb518316/charts/tractusx-connector/values.yaml#L48))
- Add your **trustedIssuer** to `iatp.trustedIssuer` ([example](https://github.com/eclipse-tractusx/tractusx-edc/blob/cbe28ef483ea7787f90cecb0058d9913eb518316/charts/tractusx-connector/values.yaml#L51))  
  > **Note:** You can add multiple `trustedIssuers` along with their `supportedTypes`.
- Set `iatp.sts.dim.url`, `iatp.sts.oauth.token_url`, `iatp.sts.oauth.client.id`, and `iatp.sts.oauth.client.secret_alias` with your respective values.
- For `iatp.sts.oauth.client.secret_alias`, you can create an alias (e.g., `edc-client-secret`) and store your client secret under `secret/edc_client_secret` in HashiCorp Vault.
- Provide `controlplane.bdrs.server.url` as needed.

For initial setup, you can deploy the control plane and data plane locally. If you want to make the control plane and data plane publicly available later, set `ingresss.enabled` to `true` and define your hostname in `ingresses.hostname`. Repeat this step for the data plane as well.

To deploy the connector:

```bash
helm repo add tractusx-edc https://eclipse-tractusx.github.io/charts/dev
helm install <release-name> tractusx-edc/tractusx-connector --version <version> -f <path-to>/values.yaml
```

Check the latest releases here: [Releases](https://github.com/eclipse-tractusx/tractusx-edc/releases)

---

### 2. Use Official Charts from Smart Systems Hub

Smart Systems Hub provides public charts to deploy Tractus-X EDC:  
[Smart Systems Hub Tractus-X Helm Chart](https://github.com/Smart-Systems-Hub/helm-charts/tree/main/charts/edc)

Edit the [values.yaml](https://github.com/Smart-Systems-Hub/helm-charts/blob/main/charts/edc/values.yaml) file and adjust the following:

- Add your **BPN Number** to `participant.id`
- Add your **DID** to `iatp.id`
- Add your **trustedIssuer** to `iatp.trustedIssuer`  
  > **Note:** Multiple `trustedIssuers` with `supportedTypes` are supported.
- Set `iatp.sts.dim.url`, `iatp.sts.oauth.token_url`, `iatp.sts.oauth.client.id`, `iatp.sts.oauth.client.secret_alias`, and `controlplane.bdrs.server.url`.

For secrets, store your client secret in HashiCorp Vault under an alias like `secret/edc-client-secret`.

To enable public access for control and data planes, set `ingresss.enabled` to `true` and define the hostnames in `ingresses.hostname` for both control and data plane.

Smart Systems Hub also provides API rule options to expose your services publicly. To use this, keep `apiRule.enabled: true` (see [API-rule enabled true](https://github.com/Smart-Systems-Hub/helm-charts/blob/3f6a60bb22549cba7de0db13123fe6b05f9abc74/charts/edc/values.yaml#L344)) or set to `false` if not needed. Provide the respective hostnames as required.

By default, Smart Systems Hub uses a central vault (`install.vault: false`). To use your own, set `install.vault: true` and provide the appropriate Vault URL ([provide vault url](https://github.com/Smart-Systems-Hub/helm-charts/blob/3f6a60bb22549cba7de0db13123fe6b05f9abc74/charts/edc/values.yaml#L734)).

> **Note:** Smart Systems Hub enabled autoscaler and uses minimal resources. For autoscaling, set to `true` in both control and data plane as needed.

To deploy:

```bash
helm repo add smart-systems-hub https://smart-systems-hub.github.io/helm-charts 
helm install <release-name> smart-systems-hub/tractusx-connector --version <version> -f <path-to>/values.yaml
```

Check latest releases here: [Releases](https://github.com/Smart-Systems-Hub/helm-charts/releases)

---

## How to Deploy Factory-X EDC

To deploy Factory-X EDC, you need a wallet and credentials. Contact Smart Systems Hub to obtain:

- `participant.id`
- `iatp.trustedIssuer`
- `iatp.sts.dim.url`
- `iatp.sts.oauth.token_url`
- `iatp.sts.oauth.client.id`
- `iatp.sts.oauth.client.secret_alias`

> **Note:** Factory-X EDC expects to find `iatp.sts.oauth.client.secret_alias` under HashiCorp at `secret/client-secret`.

You may use the following approaches:

### 1. Use Official Charts from the Factory-X EDC GitHub Repository

Factory-X EDC is an open-source project with container images and deployments for the Eclipse Dataspace Components in the Factory-X project.

Refer to the [Factoryx-EDC README](https://github.com/factory-x-contributions/factoryx-edc/tree/main/charts/factoryx-connector) for deployment details.

Edit [values.yaml](https://github.com/factory-x-contributions/factoryx-edc/blob/main/charts/factoryx-connector/values.yaml) and set:

- Add your **DID** to `participant.id`
- Add your **trustedIssuer** to `iatp.trustedIssuer`  
  > **Note:** Multiple `trustedIssuers` with `supportedTypes` are supported.
- Configure other values accordingly (`iatp.sts.dim.url`, `iatp.sts.oauth.token_url`, `iatp.sts.oauth.client.id`, `iatp.sts.oauth.client.secret_alias`)
- Store your client secret in HashiCorp Vault as described above.

To deploy:

```bash
helm repo add factoryx-dev https://factory-x-contributions.github.io/charts/dev
helm install <release-name> factory-x-contributions/factoryx-connector --version <version> -f <path-to>/values.yaml
```

See the latest releases: [Releases](https://github.com/factory-x-contributions/factoryx-edc/releases)

---

### 2. Use Official Charts from Smart Systems Hub

Smart Systems Hub also offers charts for deploying Factory-X EDC:  
[Smart Systems Hub Factory-X Helm Chart](https://github.com/Smart-Systems-Hub/helm-charts/tree/main/charts/factoryX-edc)

Adjust the [values.yaml](https://github.com/Smart-Systems-Hub/helm-charts/blob/main/charts/factoryX-edc/values.yaml):

- Set your **DID** in `participant.id`
- Add your **trustedIssuer** in `iatp.trustedIssuer`  
  > **Note:** Multiple `trustedIssuers` with `supportedTypes` are supported.
- Configure other required values and secrets.

For public deployment, set `ingresss.enabled` to `true` and define the respective hostnames.

To enable central vault, `install.vault` should be set to `true` if required.

To deploy:

```bash
helm repo add smart-systems-hub https://smart-systems-hub.github.io/helm-charts 
helm install <release-name> smart-systems-hub/factoryx-connector --version <version> -f <path-to>/values.yaml
```

Find the latest releases here: [Releases](https://github.com/Smart-Systems-Hub/helm-charts/releases)

---
