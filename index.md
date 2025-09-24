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
  Smart Systems Hub supports users with onboarding to Manufacturing-X based on the Explore and Learn environment. Learn more: <a href="https://www.smart-systems-hub.de/en/manufacturing-x">Manufacturing-X</a>.
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
  Yes, it's absolutely possible. Smart Systems Hub provides wallets and identities that you can use to deploy a Tractus-X EDC or a Factory-X EDC in your own environment.
</details>

<details>
  <summary>Why is the catalog request not working?</summary>
  <p>Below are common causes and how to resolve them:</p>

  <p><strong>Cause 1: Missing client secret or vault access</strong></p>
  <pre><code class="language-json">[
    {
      "message": "Unable to obtain credentials: Failed to fetch client secret from the vault with alias: edc-client-secret",
      "type": "BadGateway",
      "path": null,
      "invalidValue": null
    }
  ]
  </code></pre>
  <p>Ensure the client secret exists in the vault and that the connector has permission to read it.</p>

  <p><strong>Cause 2: Wrong DSP URL in the counterparty address</strong></p>
  <pre><code class="language-json">[
    {
      "message": "&lt;html&gt;\n&lt;head&gt;\n&lt;meta http-equiv=\"Content-Type\" content=\"text/html;charset=ISO-8859-1\"/&gt;\n&lt;title&gt;Error 404 Not Found&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;&lt;h2&gt;HTTP ERROR 404 Not Found&lt;/h2&gt;\n&lt;table&gt;\n&lt;tr&gt;&lt;th&gt;URI:&lt;/th&gt;&lt;td&gt;/api/v1/dsp/catalog/request&lt;/td&gt;&lt;/tr&gt;\n&lt;tr&gt;&lt;th&gt;STATUS:&lt;/th&gt;&lt;td&gt;404&lt;/td&gt;&lt;/tr&gt;\n&lt;tr&gt;&lt;th&gt;MESSAGE:&lt;/th&gt;&lt;td&gt;Not Found&lt;/td&gt;&lt;/tr&gt;\n&lt;tr&gt;&lt;th&gt;SERVLET:&lt;/th&gt;&lt;td&gt;EDC-default&lt;/td&gt;&lt;/tr&gt;\n&lt;/table&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n",
      "type": "BadGateway",
      "path": null,
      "invalidValue": null
    }
  ]
  </code></pre>
  <p>Verify you are using the correct DSP URL for the counterparty.</p>

  <p><strong>Cause 3: BPN/DID not registered in BDRS or BDRS unavailable</strong></p>
  <pre><code class="language-json">[
    {
      "message": "Unable to obtain credentials: Empty optional",
      "type": "BadGateway",
      "path": null,
      "invalidValue": null
    }
  ]
  </code></pre>
  <p>Confirm that the BPN and its corresponding DID entry are present in the BDRS and that the BDRS service is reachable.</p>

  <p><strong>You can also follow this document to make a catalog request: <a href="https://smart-systems-hub.github.io/docs/Management-API-Overview.html#:~:text=Consumer-,Catalog,-Send%20catalog%20request">How to make a catalog request</a>.</strong></p>
</details>

<details>
  <summary>Why is Data Access not working?</summary>
  <p>After the EDR has been negotiated and stored, you can fetch data. Common errors include HTTP 500 and 403. Below are common causes and how to resolve them:</p>

  <p><strong>Cause 1: Provider endpoint is not working correctly</strong></p>
  <p>Ensure you set the correct provider base URL during asset creation and that the endpoint is reachable; otherwise, you may receive a 500 Internal Server Error.</p>

  <p><strong>Cause 2: OAuth 2 endpoint not defined correctly during asset creation</strong></p>
  <pre><code class="language-html">&lt;html&gt;
&lt;head&gt;
    &lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=ISO-8859-1&quot; /&gt;
    &lt;title&gt;Error 500 Internal Server Error&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h2&gt;HTTP ERROR 500 Internal Server Error&lt;/h2&gt;
    &lt;table&gt;
        &lt;tr&gt;
            &lt;th&gt;URI:&lt;/th&gt;
            &lt;td&gt;/api/public&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;th&gt;STATUS:&lt;/th&gt;
            &lt;td&gt;500&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;th&gt;MESSAGE:&lt;/th&gt;
            &lt;td&gt;Internal Server Error&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;th&gt;SERVLET:&lt;/th&gt;
            &lt;td&gt;EDC-public&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;
  </code></pre>
  <p>You may see the above 500 response when the provider endpoint is secured with OAuth 2 but the asset was created without OAuth 2 credentials. Create the asset with OAuth 2 credentials configured. See: <a href="https://smart-systems-hub.github.io/docs/How-to-work-with-oauth2-configure-endpoint.html">How to create an asset if the provider’s endpoint is secured with OAuth 2</a>.</p>

  <p><strong>Cause 3: Token has expired</strong></p>
  <pre><code class="language-json">{
  "errors": [
    "Token has expired (exp)"
  ]
}
  </code></pre>
  <p>This typically results in a 403 response. Access tokens expire after 5 minutes; generate a new token and include it in the Authorization header.</p>
</details>

<details>
  <summary>Which policies can a user create?</summary>
  <p>You typically need to define Usage and Access policies. See: <a href="https://smart-systems-hub.github.io/docs/Management-API-Overview.html#:~:text=with%20OAuth%202-,Policies,-Add%20Access%20policy">How to create policies</a>.</p>

  <p><strong>Can I create a group policy?</strong></p>
  <p>Yes, it's absolutely possible. See: <a href="https://smart-systems-hub.github.io/docs/How-to-use-business-partner-group.html">How to Create a Business Partner Group for Group Policy Scenarios</a>.</p>

  <p><strong>Can I create a policy with a Dismantler constraint?</strong></p>
  <p>Yes, it's absolutely possible. See: <a href="https://smart-systems-hub.github.io/docs/How-to-use-Dismantler-Scenario-in-Policy.html">How to use Dismantler Scenario in Usage/Contract policy</a>.</p>
</details>