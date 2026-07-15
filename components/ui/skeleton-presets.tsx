import * as React from 'react';
import { cn } from '@/lib/utils';

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3 rounded-lg border p-6', className)}>
      <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
      <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-3 w-5/6 animate-pulse rounded-md bg-muted" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}

export function AvatarSkeleton({ className }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'h-10 w-10 animate-pulse rounded-full bg-muted',
          className
        )}
      />
      <div className="space-y-2">
        <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
        <div className="h-2 w-16 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="h-2 w-1/4 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 animate-pulse rounded-md bg-muted" />
          <div className="h-7 w-28 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-12 w-12 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mt-4 h-2 w-full animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-lg border p-6">
      <div className="mb-4 h-4 w-32 animate-pulse rounded-md bg-muted" />
      <div className="flex h-48 items-end gap-2">
        {[40, 65, 35, 80, 55, 90, 45, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-t bg-muted"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
