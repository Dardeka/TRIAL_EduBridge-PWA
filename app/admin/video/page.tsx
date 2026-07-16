'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface VideoMaterial {
  _id: string;
  title: string;
  subject: { name: string } | null;
  level: string;
  duration: string;
  views: number;
  status: 'draft' | 'review' | 'published';
}

export default function AdminVideoPage() {
  const [videos, setVideos] = useState<VideoMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/materials', {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat video');
      const json = await res.json();
      setVideos(json.data.filter((m: any) => m.type === 'video'));
    } catch (err) {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Hapus video "${title}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch(`/api/admin/materials?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (!res.ok) throw new Error('Gagal menghapus');
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert('Gagal menghapus video. Coba lagi.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader title="Kelola Video" description="Semua video pembelajaran">
        <Button className="gap-2" asChild>
          <Link href="/admin/upload">
            <Plus className="h-4 w-4" /> Upload Video
          </Link>
        </Button>
      </PageHeader>

      {loading && (
        <div className="py-20 text-center text-muted-foreground">
          Memuat video...
        </div>
      )}

      {!loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video._id} variant="elevated">
              <CardContent className="pt-6">
                {/* Thumbnail */}
                <div className="relative mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted">
                  <Play className="h-10 w-10 text-muted-foreground" />
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                    {video.duration}
                  </span>
                </div>

                <div className="mb-2 flex items-start justify-between">
                  <div className="flex gap-1.5">
                    <Badge variant="secondary" size="sm">
                      {video.level}
                    </Badge>
                    <Badge
                      variant={
                        video.status === 'published' ? 'success' : 'secondary'
                      }
                      size="sm"
                    >
                      {video.status === 'published'
                        ? 'Publish'
                        : video.status === 'review'
                          ? 'Review'
                          : 'Draft'}
                    </Badge>
                  </div>
                </div>

                <h3 className="font-medium">{video.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {video.subject?.name ?? '-'}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    {video.views.toLocaleString()} views
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm" disabled>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive"
                      onClick={() => handleDelete(video._id, video.title)}
                      disabled={deletingId === video._id}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {videos.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              Belum ada video yang diupload.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
