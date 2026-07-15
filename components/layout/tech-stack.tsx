'use client';

import { techStack } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { StaggerContainer, StaggerItem } from '@/components/motion';

export function TechStack() {
  return (
    <section id="tech-stack" className="scroll-mt-16 bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Modern tech stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Battle-tested tools that scale from prototype to production.
          </p>
        </div>

        <StaggerContainer
          className="mt-12 flex flex-wrap justify-center gap-3"
          stagger={0.05}
        >
          {techStack.map((tech) => (
            <StaggerItem key={tech.name}>
              <Badge
                variant="outline"
                className="gap-2 px-4 py-2 text-sm font-medium"
              >
                {tech.name}
                <span className="text-muted-foreground">{tech.version}</span>
              </Badge>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
