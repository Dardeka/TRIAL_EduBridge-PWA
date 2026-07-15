'use client';

import Link from 'next/link';
import { WifiOff, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="font-heading text-2xl font-bold tracking-tight">
        Anda Sedang Offline
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Tidak ada koneksi internet. Beberapa materi yang sudah Anda buka
        sebelumnya masih bisa diakses secara offline.
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
        <Button asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Ke Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
