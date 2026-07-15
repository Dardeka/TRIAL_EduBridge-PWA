export const siteConfig = {
  name: 'EduBridge',
  description:
    'EduBridge Design System — a comprehensive component library for educational platforms.',
  url: 'https://edubridge.app',
  ogImage: 'https://edubridge.app/og.png',
  links: {
    github: 'https://github.com/edubridge',
    twitter: 'https://twitter.com/edubridge',
  },
} as const;

export type SiteConfig = typeof siteConfig;
