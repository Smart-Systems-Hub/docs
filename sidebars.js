// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Overview',
      link: {
        type: 'generated-index',
        description: 'Guides and references for Overview.',
        slug: '/overview',
      },
      items: [
        'index',
        'How-to-deploy-EDC'
      ]
    },
    {
      type: 'category',
      label: 'Tractus-X EDC Connector',
      link: {
        type: 'generated-index',
        description: 'Guides and references for Tractus-X EDC connector.',
        slug: '/tractus-x-edc-connector',
      },
      items: [
        'Management-API-Overview',
        'Management-API-Overview-video',
        'Management-API-Overview-0-11-0',
        'How-to-work-with-oauth2-configure-endpoint',
        'How-to-use-business-partner-group',
        'Business-partner-group-video',
        'How-to-use-Dismantler-Scenario-in-Policy',
        'Dismantler-policy-scenario-video',
        'How-to-migrate-to-0-11-0',
      ],
    },
    {
      type: 'category',
      label: 'Factory-X EDC Connectors',
      link: {
        type: 'generated-index',
        description: 'Guides and references for Factory-X EDC connectors.',
        slug: '/factory-x-edc-connectors',
      },
      items: [
        'Management-API-Overview-FX-connectors',
      ],
    },
    {
      type: 'category',
      label: 'Central Vault',
      link: {
        type: 'generated-index',
        description: 'How to use the central vault for secrets management.',
        slug: '/central-vault',
      },
      items: [
        'How-to-use-central-vault',
      ],
    },
    {
      type: 'category',
      label: 'Asset Administration Shell (AAS)',
      link: {
        type: 'generated-index',
        description: 'AAS introduction and resources.',
        slug: '/asset-administration-shell-aas',
      },
      items: [
        'Asset-Administration-Shell-Introduction',
      ],
    },
  ],
  faqSidebar: [
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
  ],
};

export default sidebars;
