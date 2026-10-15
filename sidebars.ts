import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  platform: [
    'intro',
    'how-it-works',
    'add-a-project',
    'operations',
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['reference/publish-workflow', 'reference/projects-json', 'reference/deploy'],
    },
  ],
};

export default sidebars;
