import { Section } from './section';
import { EduNavbar } from '@/components/ui/edu-navbar';

const navItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Courses', href: '#courses', badge: 'New' },
  { label: 'Teachers', href: '#teachers' },
  { label: 'Progress', href: '#progress' },
];

export function NavbarSection() {
  return (
    <Section
      id="navbar"
      title="Navbar"
      description="A sticky navigation bar with logo, links, search, notifications, and user avatar."
    >
      <div className="overflow-hidden rounded-lg border">
        <EduNavbar
          items={navItems}
          user={{ name: 'Alex Chen', initials: 'AC' }}
        />
        <div className="flex h-48 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
          Page content area
        </div>
      </div>
    </Section>
  );
}
