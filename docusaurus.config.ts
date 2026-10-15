import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// DOCS_SITE_URL and DOCS_BASE_PATH are set by docs-deployer's publish
// workflow (base path /platform/). Locally the site runs at /.
const siteUrl = process.env.DOCS_SITE_URL ?? 'http://localhost:3000';

const config: Config = {
  title: 'Docs platform',
  tagline: 'How docs.itzemoji.com works',
  favicon: 'img/favicon.svg',
  url: siteUrl,
  baseUrl: process.env.DOCS_BASE_PATH ?? '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw' } },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ItzEmoji/docs-dotfiles/tree/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: 'Docs platform',
      items: [
        { href: siteUrl, label: 'All docs', position: 'right' },
        { href: 'https://github.com/ItzEmoji/docs-deployer', label: 'docs-deployer', position: 'right' },
      ],
    },
    footer: { style: 'light', copyright: 'itzemoji' },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
