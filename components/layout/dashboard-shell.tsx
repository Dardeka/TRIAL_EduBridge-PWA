'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, Bell, Search, LogOut, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { type NavGroup, type NavItem } from '@/config/navigation';

export interface DashboardShellProps {
  navGroups: NavGroup[];
  user: { name: string; initials: string };
  brandLabel: string;
  brandHref: string;
  onSignOut?: () => void;
  isGuest?: boolean;
  children: React.ReactNode;
}

export function DashboardShell({
  navGroups,
  user,
  brandLabel,
  brandHref,
  onSignOut,
  isGuest = false,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const renderNavItem = (item: NavItem) => {
    const active = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        key={item.href + item.label}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Link href={brandHref} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-heading text-base font-bold">
              {brandLabel}
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto p-3">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map(renderNavItem)}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="mb-2 flex items-center gap-3 rounded-md px-3 py-2">
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              {isGuest && (
                <Badge variant="warning" size="sm">
                  Mode Tamu
                </Badge>
              )}
            </div>
          </div>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-card">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link
                href={brandHref}
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-heading text-base font-bold">
                  {brandLabel}
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-6 overflow-y-auto p-3">
              {navGroups.map((group, gi) => (
                <div key={gi}>
                  <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </p>
                  <div className="space-y-1">
                    {group.items.map(renderNavItem)}
                  </div>
                </div>
              ))}
            </nav>
            {onSignOut && (
              <div className="border-t p-3">
                <button
                  onClick={onSignOut}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card/80 px-4 backdrop-blur-lg sm:px-6">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden flex-1 md:block">
            <InputWithIcon
              placeholder="Cari materi, kelas, atau guru..."
              className="max-w-md"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            {isGuest && (
              <Badge variant="warning" size="sm" className="hidden sm:inline-flex">
                <UserCircle className="h-3 w-3" /> Mode Tamu
              </Badge>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
