import { Section } from './section';
import { EduFooter } from '@/components/ui/edu-footer';

const footerSections = [
  {
    title: 'Learn',
    links: [
      { label: 'All Courses', href: '#' },
      { label: 'Learning Paths', href: '#' },
      { label: 'Certificates', href: '#' },
      { label: 'Free Resources', href: '#' },
    ],
  },
  {
    title: 'Teach',
    links: [
      { label: 'Become a Teacher', href: '#' },
      { label: 'Teacher Handbook', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

export function FooterSection() {
  return (
    <Section
      id="footer"
      title="Footer"
      description="Multi-column footer with brand section, link groups, and social icons."
    >
      <div className="overflow-hidden rounded-lg border">
        <EduFooter sections={footerSections} />
      </div>
    </Section>
  );
}
