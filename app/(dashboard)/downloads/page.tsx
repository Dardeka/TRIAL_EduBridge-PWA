'use client';

import { useState, useEffect } from 'react';
import { Download as DownloadIcon, FileText, Video, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers/auth-provider';
import { supabase } from '@/lib/supabase';

interface DownloadItem {
  _id: string;
  title: string;
  subject: string;
  type: 'video' | 'pdf';
  fileSize: string;
  fileUrl?: string;
  createdAt: string;
}

export default function DownloadsPage() {
  const { user, isGuest } = useAuth();
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(!isGuest);

  useEffect(() => {
    if (isGuest || !user?.id) {
      setDownloads([]);
      setLoading(false);
      return;
    }

    async function fetchDownloads() {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const res = await fetch('/api/downloads', {
          headers: session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : {},
        });
        if (!res.ok) throw new Error('Gagal memuat downloads');
        const json = await res.json();
        setDownloads(json.data);
      } catch {
        setDownloads([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDownloads();
  }, [user?.id, isGuest]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const handleDownload = (item: DownloadItem) => {
    if (item.fileUrl) {
      window.open(item.fileUrl, '_blank');
    }
  };

  return (
    <div>
      <PageHeader
        title="Downloads"
        description="Materi yang telah Anda unduh"
      />

      {isGuest && (
        <p className="mb-4 text-sm text-muted-foreground">
          Riwayat download tidak tersedia dalam mode tamu.
        </p>
      )}

      {loading && (
        <div className="py-20 text-center text-muted-foreground">
          Memuat downloads...
        </div>
      )}

      {!loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item) => (
            <Card key={item._id} variant="elevated">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    {item.type === 'video' ? (
                      <Video className="h-6 w-6 text-info" />
                    ) : (
                      <FileText className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <Badge
                    variant={item.type === 'video' ? 'info' : 'accent'}
                    size="sm"
                  >
                    {item.type === 'video' ? 'Video' : 'PDF'}
                  </Badge>
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{item.fileSize}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => handleDownload(item)}
                    disabled={!item.fileUrl}
                  >
                    <DownloadIcon className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && downloads.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          Belum ada materi yang diunduh
        </div>
      )}
    </div>
  );
}
