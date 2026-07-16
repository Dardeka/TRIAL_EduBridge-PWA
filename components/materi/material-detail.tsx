'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Users,
  Play,
  Download,
  ArrowLeft,
  HelpCircle,
  Star,
} from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { MaterialPlayer } from '@/components/materi/material-player';
import { useAuth } from '@/components/providers/auth-provider';
import { supabase } from '@/lib/supabase';

interface Chapter {
  _id: string;
  title: string;
  duration: string;
  done: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

interface MaterialData {
  _id: string;
  title: string;
  subject: { name: string } | null;
  level: string;
  type: 'video' | 'pdf' | 'text';
  duration: string;
  students: number;
  rating: number;
  description: string;
  chapters: Chapter[];
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};
}

export function MaterialDetail({
  id,
  material,
}: {
  id: string;
  material: MaterialData;
}) {
  const { user } = useAuth();
  const [completedCount, setCompletedCount] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const totalCount = material.chapters.length;

  useEffect(() => {
    if (!user || user.isGuest) return;
    getAuthHeaders().then((headers) => {
      fetch('/api/activity/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ minutesSpent: 1 }),
      }).catch(() => {});
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getAuthHeaders().then((headers) => {
      fetch(`/api/progress/material?materialId=${id}`, { headers })
        .then((res) => res.json())
        .then((json) => {
          const percent = json.data?.percent ?? 0;
          setCompletedCount(Math.round((percent / 100) * totalCount));
        })
        .catch(() => {});
    });
  }, [user, id, totalCount]);

  const chaptersWithDone = material.chapters.map((c, i) => ({
    ...c,
    done: i < completedCount,
  }));

  return (
    <div>
      <Link
        href="/materi"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
      </Link>

      <PageHeader
        title={material.title}
        description={material.subject?.name ?? '-'}
      >
        <div className="flex gap-2">
          <a
            href={
              material.type === 'video'
                ? material.chapters[0]?.videoUrl
                : material.chapters[0]?.pdfUrl
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
          </a>
          <Button className="gap-2">
            <Play className="h-4 w-4" /> Mulai Belajar
          </Button>
        </div>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{material.level}</Badge>
        <Badge variant={material.type === 'video' ? 'info' : 'accent'}>
          {material.type === 'video' ? 'Video' : 'PDF'}
        </Badge>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> {material.duration}
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" /> {material.students} siswa
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-accent text-accent" /> {material.rating}
        </span>
      </div>

      {user && !user.isGuest && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Beri Rating:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={hasRated}
                onClick={async () => {
                  setSelectedRating(star);
                  try {
                    const headers = await getAuthHeaders();
                    const res = await fetch(`/api/materials/${id}/rate`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                      },
                      body: JSON.stringify({ rating: star }),
                    });
                    if (res.ok) setHasRated(true);
                  } catch {}
                }}
                onMouseEnter={() => !hasRated && setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="disabled:cursor-default"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hoverRating || selectedRating)
                      ? 'fill-accent text-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          {hasRated && (
            <span className="text-sm font-medium text-primary">
              Terima kasih!
            </span>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-3 font-heading text-lg font-semibold">
                Tentang Materi Ini
              </h3>
              <p className="text-muted-foreground">{material.description}</p>
            </CardContent>
          </Card>

          <MaterialPlayer chapters={chaptersWithDone} type={material.type} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Belajar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Selesai</span>
                  <span className="font-medium">
                    {completedCount}/{totalCount}
                  </span>
                </div>
                <Progress
                  value={
                    totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                  }
                  color="success"
                />
              </div>
              <Button className="w-full gap-2">
                <Play className="h-4 w-4" /> Lanjutkan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Uji Pemahaman
              </CardTitle>
              <CardDescription>
                Selesaikan kuis untuk mendapatkan sertifikat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/quiz/${id}`}>
                <Button variant="accent" className="w-full">
                  Mulai Kuis
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
