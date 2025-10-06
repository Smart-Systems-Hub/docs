// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const organizationName = "Smart-Systems-Hub";
const projectName = "docs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Smart-Systems-Hub Manufacturing-X',
  tagline: 'Learn & Explore Environment',
  favicon: 'img/smartsystemshub-favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: `https://${organizationName}.github.io`,
  baseUrl: `/${projectName}/`,
  trailingSlash: false,

  organizationName,
  projectName,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Manufacturing-X',
        logo: {
          alt: 'Manufacturing-X Logo',
          src: 'img/Smart-Systems-Hub_Logo_144ppi.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          { type: 'doc', docId: 'faq', label: 'FAQ', position: 'left' },
          {
            href: 'https://www.smart-systems-hub.de/en/home',
            label: 'Smart-Systems-Hub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Smart-Systems-Hub',
            items: [
              {
                label: 'Manufacturing-X',
                href: 'https://www.smart-systems-hub.de/en/manufacturing-x',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacy', href: 'https://www.smart-systems-hub.de/en/privacy' },
              { label: 'Imprint', href: 'https://www.smart-systems-hub.de/en/imprint' },
              { label: 'GTC', href: 'https://www.smart-systems-hub.de/en/agb' },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
