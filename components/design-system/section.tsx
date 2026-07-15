'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-20 border-t border-border/40 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

type DemoBlockProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function DemoBlock({ label, children, className }: DemoBlockProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div
        className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-border/60 bg-muted/20 p-4"
        style={{ minHeight: '60px' }}
      >
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
