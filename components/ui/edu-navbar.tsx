'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export interface EduNavbarItem {
  label: string;
  href: string;
  badge?: string;
}

export interface EduNavbarProps {
  items: EduNavbarItem[];
  user?: {
    name: string;
    initials: string;
  };
  className?: string;
}

export function EduNavbar({ items, user, className }: EduNavbarProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg',
        className
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-heading text-lg font-bold">EduBridge</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {item.badge && (
                  <Badge variant="accent" size="sm">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <InputWithIcon
              placeholder="Search courses..."
              className="w-56"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </Button>
          {user ? (
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
          )}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-card md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
