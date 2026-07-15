export const navLinks = [
  { title: 'Features', href: '#features' },
  { title: 'Tech Stack', href: '#tech-stack' },
  { title: 'Getting Started', href: '#getting-started' },
] as const;

export const features = [
  {
    title: 'App Router',
    description:
      'Leverage the Next.js App Router for layouts, nested routes, and streaming.',
    icon: 'layout',
  },
  {
    title: 'Type Safe',
    description:
      'End-to-end type safety with TypeScript and strict mode enabled.',
    icon: 'shield',
  },
  {
    title: 'Beautiful UI',
    description:
      'shadcn/ui components styled with Tailwind CSS and Radix primitives.',
    icon: 'palette',
  },
  {
    title: 'Animated',
    description: 'Framer Motion powers smooth, delightful micro-interactions.',
    icon: 'sparkles',
  },
  {
    title: 'Code Quality',
    description:
      'ESLint, Prettier, and Husky pre-commit hooks keep the codebase clean.',
    icon: 'check',
  },
  {
    title: 'Scalable',
    description: 'A folder structure designed for production teams and growth.',
    icon: 'layers',
  },
] as const;

export const techStack = [
  { name: 'Next.js 15', version: '15.x' },
  { name: 'TypeScript', version: '5.x' },
  { name: 'Tailwind CSS', version: '3.x' },
  { name: 'shadcn/ui', version: 'latest' },
  { name: 'Framer Motion', version: '11.x' },
  { name: 'Lucide React', version: 'latest' },
  { name: 'ESLint', version: '8.x' },
  { name: 'Prettier', version: '3.x' },
  { name: 'Husky', version: '9.x' },
] as const;
