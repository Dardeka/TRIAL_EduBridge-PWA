'use client';

import { Layout, Shield, Palette, Sparkles, Check, Layers } from 'lucide-react';
import { features } from '@/constants';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { StaggerContainer, StaggerItem } from '@/components/motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  shield: Shield,
  palette: Palette,
  sparkles: Sparkles,
  check: Check,
  layers: Layers,
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Thoughtfully structured and configured so your team can focus on
            building features, not boilerplate.
          </p>
        </div>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <StaggerItem key={feature.title}>
                <Card className="group h-full transition-all hover:border-primary/40 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
