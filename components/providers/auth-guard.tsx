'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import type { NavGroup } from '@/config/navigation';

export interface AuthGuardProps {
  navGroups: NavGroup[];
  brandLabel: string;
  brandHref: string;
  requireAdmin?: boolean;
  children: React.ReactNode;
}

export function AuthGuard({
  navGroups,
  brandLabel,
  brandHref,
  requireAdmin = false,
  children,
}: AuthGuardProps) {
  const { user, loading, signOut, isGuest } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (requireAdmin && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, loading, requireAdmin, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Mengalihkan ke halaman login...
          </p>
        </div>
      </div>
    );
  }

  if (requireAdmin && user.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Mengalihkan ke dashboard...
          </p>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
  };

  return (
    <DashboardShell
      navGroups={navGroups}
      user={{ name: user.fullName, initials: user.initials }}
      brandLabel={brandLabel}
      brandHref={brandHref}
      onSignOut={handleSignOut}
      isGuest={isGuest}
    >
      {children}
    </DashboardShell>
  );
}
