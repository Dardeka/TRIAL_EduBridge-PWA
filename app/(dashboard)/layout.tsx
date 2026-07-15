'use client';

import { AuthGuard } from '@/components/providers/auth-guard';
import { dashboardNav } from '@/config/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard
      navGroups={dashboardNav}
      brandLabel="EduBridge"
      brandHref="/dashboard"
    >
      {children}
    </AuthGuard>
  );
}
