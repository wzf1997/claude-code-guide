import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Claude Code 源码精读',
  tagline: '从零到深，读懂 AI Agent 的工程实现',
  favicon: 'img/favicon.ico',

  url: 'https://claude-code.guide',
  baseUrl: process.env.DEPLOY_TARGET === 'ghpages' ? '/claude-code-guide/' : '/',

  organizationName: 'your-github-username',
  projectName: 'claude-code-guide',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/your-github-username/claude-code-guide/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/themes.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Claude Code 源码精读',
      logo: {
        alt: 'Claude Code 源码精读',
        src: 'img/docusaurus.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '开始学习',
        },
        {
          type: 'custom-themeSwitcher',
          position: 'right',
        },
        {
          href: 'https://github.com/your-github-username/claude-code-guide',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Claude Code 源码精读`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'tsx', 'json'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
