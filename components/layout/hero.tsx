'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 70%, hsl(var(--chart-1) / 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="gap-1.5 px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Production-ready Next.js 15
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Build faster with a{' '}
          <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            scalable foundation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          A production-grade starter with App Router, TypeScript, Tailwind CSS,
          shadcn/ui, Framer Motion, and a folder structure built for growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Github className="h-4 w-4" /> View on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
