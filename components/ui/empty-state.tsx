import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const sizeConfig = {
  sm: {
    container: 'py-8',
    icon: 'h-10 w-10',
    title: 'text-base',
    description: 'text-sm',
  },
  default: {
    container: 'py-16',
    icon: 'h-14 w-14',
    title: 'text-lg',
    description: 'text-base',
  },
  lg: {
    container: 'py-24',
    icon: 'h-20 w-20',
    title: 'text-xl',
    description: 'text-lg',
  },
} as const;

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'default',
}: EmptyStateProps) {
  const cfg = sizeConfig[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        cfg.container,
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'mb-4 flex items-center justify-center rounded-full bg-muted text-muted-foreground',
            cfg.icon
          )}
        >
          {icon}
        </div>
      )}
      <h3
        className={cn('font-heading font-semibold text-foreground', cfg.title)}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'mt-1.5 max-w-sm text-muted-foreground',
            cfg.description
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
