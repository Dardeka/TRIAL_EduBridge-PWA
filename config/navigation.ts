import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  Award,
  Calendar,
  Download,
  HelpCircle,
  Upload,
  Video,
  FileText,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  roles?: ('student' | 'admin' | 'guest')[];
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const dashboardNav: NavGroup[] = [
  {
    title: 'Utama',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Progress', href: '/progress', icon: BarChart3 },
    ],
  },
  {
    title: 'Belajar',
    items: [
      { label: 'Kelas', href: '/kelas', icon: GraduationCap },
      { label: 'Mata Pelajaran', href: '/mapel', icon: BookOpen },
      { label: 'Materi', href: '/materi', icon: FileText },
    ],
  },
  {
    title: 'Akun',
    items: [
      { label: 'Profile', href: '/profile', icon: Users },
      { label: 'Downloads', href: '/downloads', icon: Download },
      { label: 'Sertifikat', href: '/profile', icon: Award },
      { label: 'Pengaturan', href: '/profile', icon: Settings },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'Panel Admin',
        href: '/admin',
        icon: Settings,
        roles: ['admin'],
      },
    ],
  },
];

export const adminNav: NavGroup[] = [
  {
    title: 'Panel',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Upload Materi', href: '/admin/upload', icon: Upload },
    ],
  },
  {
    title: 'Konten',
    items: [
      { label: 'Materi', href: '/admin/materi', icon: FolderOpen },
      { label: 'Video', href: '/admin/video', icon: Video },
      { label: 'PDF', href: '/admin/pdf', icon: FileText },
    ],
  },
  {
    title: 'Sistem',
    items: [{ label: 'Pengaturan', href: '/admin', icon: Settings }],
  },
];

export const marketingNavItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Kelas', href: '/kelas' },
  { label: 'Materi', href: '/materi' },
  { label: 'Dashboard', href: '/dashboard' },
];

export const footerSections = [
  {
    title: 'Belajar',
    links: [
      { label: 'Semua Kelas', href: '/kelas' },
      { label: 'Kelas SD', href: '/kelas/sd' },
      { label: 'Kelas SMP', href: '/kelas/smp' },
      { label: 'Kelas SMA', href: '/kelas/sma' },
    ],
  },
  {
    title: 'Materi',
    links: [
      { label: 'Semua Materi', href: '/materi' },
      { label: 'Mata Pelajaran', href: '/mapel' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
  {
    title: 'Akun',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Daftar', href: '/register' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Profile', href: '/profile' },
    ],
  },
];
