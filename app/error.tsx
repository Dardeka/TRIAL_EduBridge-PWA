'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-heading text-7xl font-bold text-destructive">!</p>
      <h1 className="mt-4 text-2xl font-bold">Terjadi Kesalahan</h1>
      <p className="mt-2 text-muted-foreground">
        {error.message || 'Something went wrong. Silakan coba lagi.'}
      </p>
      <Button onClick={reset} className="mt-6">
        Coba Lagi
      </Button>
    </div>
  );
}
