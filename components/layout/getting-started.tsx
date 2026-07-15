import { Terminal, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CodeBlock } from './code-block';

const steps = [
  {
    title: 'Install dependencies',
    code: 'npm install',
  },
  {
    title: 'Start the dev server',
    code: 'npm run dev',
  },
  {
    title: 'Format your code',
    code: 'npm run format',
  },
  {
    title: 'Run linting',
    code: 'npm run lint',
  },
];

export function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Getting started
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Up and running in four commands.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="mb-2 font-medium">{step.title}</p>
                <CodeBlock code={step.code} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
