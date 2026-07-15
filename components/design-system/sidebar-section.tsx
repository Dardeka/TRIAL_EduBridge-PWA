import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  Award,
  Calendar,
} from 'lucide-react';
import { Section } from './section';
import { Sidebar, type SidebarGroup } from '@/components/ui/sidebar';

const sidebarGroups: SidebarGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '#dashboard', icon: <LayoutDashboard /> },
      {
        label: 'My Courses',
        href: '#courses',
        icon: <BookOpen />,
        badge: '12',
      },
      { label: 'Certificates', href: '#certs', icon: <Award /> },
    ],
  },
  {
    title: 'Learning',
    items: [
      { label: 'Teachers', href: '#teachers', icon: <GraduationCap /> },
      { label: 'Classmates', href: '#classmates', icon: <Users /> },
      { label: 'Schedule', href: '#schedule', icon: <Calendar /> },
      { label: 'Analytics', href: '#analytics', icon: <BarChart3 /> },
    ],
  },
  {
    title: 'Account',
    items: [{ label: 'Settings', href: '#settings', icon: <Settings /> }],
  },
];

export function SidebarSection() {
  return (
    <Section
      id="sidebar"
      title="Sidebar"
      description="Collapsible navigation with grouped links, icons, and badges."
    >
      <div className="flex gap-6 overflow-hidden rounded-lg border">
        <Sidebar groups={sidebarGroups} />
        <div className="flex flex-1 items-center justify-center bg-muted/30 p-8 text-sm text-muted-foreground">
          Main content area
        </div>
      </div>
    </Section>
  );
}
