'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Palette } from 'lucide-react';
import { TypographySection } from '@/components/design-system/typography-section';
import { ColorPaletteSection } from '@/components/design-system/color-palette-section';
import { ButtonSection } from '@/components/design-system/button-section';
import { InputSection } from '@/components/design-system/input-section';
import { CardSection } from '@/components/design-system/card-section';
import { BadgeSection } from '@/components/design-system/badge-section';
import { ProgressSection } from '@/components/design-system/progress-section';
import { AlertSection } from '@/components/design-system/alert-section';
import { ModalSection } from '@/components/design-system/modal-section';
import { NavbarSection } from '@/components/design-system/navbar-section';
import { SidebarSection } from '@/components/design-system/sidebar-section';
import { FooterSection } from '@/components/design-system/footer-section';
import { EmptyStateSection } from '@/components/design-system/empty-state-section';
import { SkeletonSection } from '@/components/design-system/skeleton-section';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Color Palette' },
  { id: 'buttons', label: 'Button' },
  { id: 'inputs', label: 'Input' },
  { id: 'cards', label: 'Card' },
  { id: 'badges', label: 'Badge' },
  { id: 'progress', label: 'Progress Bar' },
  { id: 'alerts', label: 'Alert' },
  { id: 'modal', label: 'Modal' },
  { id: 'navbar', label: 'Navbar' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'footer', label: 'Footer' },
  { id: 'empty-state', label: 'Empty State' },
  { id: 'skeletons', label: 'Skeleton Loading' },
];

export default function DesignSystemPage() {
  const [active, setActive] = React.useState('typography');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium"
          >
            <Palette className="h-4 w-4 text-primary" />
            Design System v1.0
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
          >
            EduBridge Design System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            A comprehensive, production-ready component library for educational
            platforms. Built with Next.js, TypeScript, Tailwind CSS, and
            shadcn/ui.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <GraduationCap className="h-4 w-4 text-primary" />
            14 component categories
          </motion.div>
        </div>
      </div>

      {/* Content with sticky sidebar nav */}
      <div className="mx-auto flex max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="sticky top-8 hidden h-fit w-56 shrink-0 py-8 lg:block">
          <nav className="space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active === s.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 py-8">
          <TypographySection />
          <ColorPaletteSection />
          <ButtonSection />
          <InputSection />
          <CardSection />
          <BadgeSection />
          <ProgressSection />
          <AlertSection />
          <ModalSection />
          <NavbarSection />
          <SidebarSection />
          <FooterSection />
          <EmptyStateSection />
          <SkeletonSection />
        </main>
      </div>
    </div>
  );
}
