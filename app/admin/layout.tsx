'use client';

import { AuthGuard } from '@/components/providers/auth-guard';
import { adminNav } from '@/config/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard
      navGroups={adminNav}
      brandLabel="Admin Panel"
      brandHref="/admin"
      requireAdmin
    >
      {children}
    </AuthGuard>
  );
}
