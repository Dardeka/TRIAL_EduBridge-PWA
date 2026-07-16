'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Award, Target } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/providers/auth-provider';
import {
  StatCardSkeleton,
  ChartSkeleton,
} from '@/components/ui/skeleton-presets';
import { ErrorBoundary } from '@/components/error-boundary';

const ICON_MAP: Record<string, any> = {
  materi: Target,
  kuis: Award,
  jam: Clock,
  skor: TrendingUp,
};

interface OverallStat {
  key: string;
  label: string;
  value: number;
  total: number;
  percent: number;
  color: 'default' | 'info' | 'success' | 'warning' | 'destructive';
}

interface SubjectProgress {
  subject: string;
  completed: number;
  total: number;
  percent: number;
  color: 'default' | 'info' | 'success' | 'warning' | 'destructive';
}

interface WeeklyActivity {
  day: string;
  hours: number;
}

const EMPTY = {
  overallStats: [] as OverallStat[],
  subjectProgress: [] as SubjectProgress[],
  weeklyActivity: [] as WeeklyActivity[],
};

export default function ProgressPage() {
  const { user, isGuest } = useAuth();
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(!isGuest);

  useEffect(() => {
    if (isGuest || !user?.id) {
      setData(EMPTY);
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchProgress() {
      try {
        setLoading(true);
        const res = await fetch(`/api/progress-overview?userId=${userId}`);
        if (!res.ok) throw new Error('Gagal memuat progress');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setData(EMPTY);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, [user?.id, isGuest]);

  const { overallStats, subjectProgress, weeklyActivity } = data;
  const maxHours = Math.max(1, ...weeklyActivity.map((d) => d.hours));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Progress Belajar"
        description="Pantau perkembangan belajar Anda"
      />

      {isGuest && (
        <p className="mb-4 text-sm text-muted-foreground">
          Progress tidak tersedia dalam mode tamu. Daftar untuk mulai melacak
          progress belajar Anda.
        </p>
      )}

      {/* Overall stats */}
      <ErrorBoundary>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overallStats.map((stat) => {
            const Icon = ICON_MAP[stat.key] ?? Target;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-heading text-2xl font-bold">
                        {stat.value}
                        <span className="text-base text-muted-foreground">
                          {' '}
                          / {stat.total}
                        </span>
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <Progress
                    value={stat.percent}
                    color={stat.color}
                    size="sm"
                    className="mt-4"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Subject progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress per Mata Pelajaran</CardTitle>
              <CardDescription>
                Selesaikan materi untuk mencapai target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.subject}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-muted-foreground">
                      {subject.completed}/{subject.total} materi
                    </span>
                  </div>
                  <Progress
                    value={subject.percent}
                    color={subject.color}
                    size="sm"
                  />
                </div>
              ))}
              {subjectProgress.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Belum ada data progress.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Weekly activity chart */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Mingguan</CardTitle>
              <CardDescription>Jam belajar per hari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end justify-between gap-2">
                {weeklyActivity.map((day) => (
                  <div
                    key={day.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                        style={{
                          height: `${(day.hours / maxHours) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {day.day}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {day.hours}j
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  );
}
