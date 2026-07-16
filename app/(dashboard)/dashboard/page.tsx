'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Star,
  Zap,
  Trophy,
  Play,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  Calendar,
  Info,
  UserPlus,
  ChevronRight,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/providers/auth-provider';
import { cn } from '@/lib/utils';
import {
  StatCardSkeleton,
  CardSkeleton,
} from '@/components/ui/skeleton-presets';
import { ErrorBoundary } from '@/components/error-boundary';

interface DashboardData {
  stats: { xp: number; xpToNextLevel: number; level: number; streak: number };
  quickStats: {
    materiSelesai: number;
    sedangBerjalan: number;
    sertifikat: number;
    jamBelajar: number;
  };
  ranking: number | null;
  continueLearning: {
    id: string;
    title: string;
    subject: string;
    level: string;
    progress: number;
    icon: string;
    duration: string;
  }[];
  subjects: {
    title: string;
    icon: string;
    color: string;
    href: string;
    lessons: number;
  }[];
  dailyTasks: {
    id: string;
    title: string;
    xp: number;
    done: boolean;
    type: string;
  }[];
  recommendations: {
    id: string;
    title: string;
    subject: string;
    level: string;
    duration: string;
    rating: number;
    students: number;
    icon: string;
    tag: string;
  }[];
  achievements: { title: string; icon: string; earned: boolean }[];
}

const EMPTY_DATA: DashboardData = {
  stats: { xp: 0, xpToNextLevel: 3000, level: 1, streak: 0 },
  quickStats: {
    materiSelesai: 0,
    sedangBerjalan: 0,
    sertifikat: 0,
    jamBelajar: 0,
  },
  ranking: null,
  continueLearning: [],
  subjects: [],
  dailyTasks: [],
  recommendations: [],
  achievements: [],
};

export default function DashboardPage() {
  const { user, isGuest } = useAuth();
  const userName = user?.fullName || 'Budi';

  const [data, setData] = useState<DashboardData>(EMPTY_DATA);
  const [loading, setLoading] = useState(!isGuest);

  useEffect(() => {
    if (isGuest || !user?.id) {
      setData(EMPTY_DATA);
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchDashboard() {
      try {
        setLoading(true);
        const res = await fetch(`/api/dashboard?userId=${userId}`);
        if (!res.ok) throw new Error('Gagal memuat dashboard');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setData(EMPTY_DATA);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [user?.id, isGuest]);

  const {
    stats,
    quickStats,
    ranking,
    continueLearning,
    subjects,
    dailyTasks,
    recommendations,
    achievements,
  } = data;
  const xpPercent =
    stats.xpToNextLevel > 0
      ? Math.round((stats.xp / stats.xpToNextLevel) * 100)
      : 0;
  const tasksDone = dailyTasks.filter((t) => t.done).length;
  const dailyXpEarned = dailyTasks
    .filter((t) => t.done)
    .reduce((sum, t) => sum + t.xp, 0);
  const dailyXpTotal = dailyTasks.reduce((sum, t) => sum + t.xp, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Guest Banner ─────────────────────────────── */}
      {isGuest && (
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Anda dalam Mode Tamu</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Progress tidak akan disimpan. Daftar untuk menyimpan hasil belajar
              Anda.
            </span>
            <Button
              size="sm"
              variant="accent"
              className="ml-4 shrink-0 gap-2"
              asChild
            >
              <Link href="/register">
                <UserPlus className="h-4 w-4" /> Daftar
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <ErrorBoundary>
        {/* ── Hero Banner ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-6 text-white sm:p-8">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-primary-foreground/80">
                    Hai,
                  </span>
                  <span className="text-lg font-bold">{userName}!</span>
                  <Badge className="bg-white/15 border-white/30 text-white">
                    <Trophy className="h-3 w-3" /> Level {stats.level}
                  </Badge>
                </div>

                <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Siap belajar hari ini?
                </h1>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Lanjutkan perjalanan belajarmu dan kumpulkan XP!
                </p>

                <div className="mt-5 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Zap className="h-4 w-4 text-accent" />
                      {stats.xp.toLocaleString()} XP
                    </span>
                    <span className="text-primary-foreground/70">
                      {(stats.xpToNextLevel - stats.xp).toLocaleString()} XP ke
                      Level {stats.level + 1}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-400 transition-all duration-700"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="bg-white/15 flex flex-col items-center justify-center rounded-xl px-5 py-4 backdrop-blur-sm">
                  <Flame className="h-7 w-7 text-accent" />
                  <p className="mt-1.5 font-heading text-2xl font-bold">
                    {stats.streak}
                  </p>
                  <p className="text-xs text-primary-foreground/80">
                    Hari Beruntun
                  </p>
                </div>
                <div className="bg-white/15 flex flex-col items-center justify-center rounded-xl px-5 py-4 backdrop-blur-sm">
                  <Star className="h-7 w-7 text-accent" />
                  <p className="mt-1.5 font-heading text-2xl font-bold">
                    {stats.xp.toLocaleString()}
                  </p>
                  <p className="text-xs text-primary-foreground/80">Total XP</p>
                </div>
                <div className="bg-white/15 flex flex-col items-center justify-center rounded-xl px-5 py-4 backdrop-blur-sm">
                  <Trophy className="h-7 w-7 text-accent" />
                  <p className="mt-1.5 font-heading text-2xl font-bold">
                    {ranking ? `#${ranking}` : '-'}
                  </p>
                  <p className="text-xs text-primary-foreground/80">Ranking</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </ErrorBoundary>

      {/* ── Quick Stats Row ──────────────────────────── */}
      <ErrorBoundary>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Materi Selesai',
              value: String(quickStats.materiSelesai),
              icon: CheckCircle2,
              color: 'bg-success/10 text-success',
            },
            {
              label: 'Sedang Berjalan',
              value: String(quickStats.sedangBerjalan),
              icon: Play,
              color: 'bg-primary/10 text-primary',
            },
            {
              label: 'Sertifikat',
              value: String(quickStats.sertifikat),
              icon: Award,
              color: 'bg-accent/15 text-accent-foreground',
            },
            {
              label: 'Jam Belajar',
              value: String(quickStats.jamBelajar),
              icon: Clock,
              color: 'bg-info/15 text-info',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-heading text-2xl font-bold">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-lg',
                        stat.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </ErrorBoundary>

      {/* ── Continue Learning ───────────────────────── */}
      <ErrorBoundary>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold tracking-tight">
              Lanjutkan Belajar
            </h2>
            <Link
              href="/materi"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Lihat semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {continueLearning.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Link href={`/materi/${course.id}`}>
                  <Card
                    variant="elevated"
                    className="group h-full cursor-pointer"
                  >
                    <CardContent className="pt-6">
                      <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 text-4xl">
                        <span className="transition-transform group-hover:scale-110">
                          {course.icon}
                        </span>
                        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <Play className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" size="sm">
                          {course.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {course.subject}
                        </span>
                      </div>
                      <h3 className="font-medium leading-snug">
                        {course.title}
                      </h3>

                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {course.duration}
                          </span>
                          <span className="font-medium text-primary">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} size="sm" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            {continueLearning.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">
                Belum ada materi yang sedang dipelajari.
              </p>
            )}
          </div>
        </section>
      </ErrorBoundary>

      {/* ── Subject Cards ───────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold tracking-tight">
            Mata Pelajaran
          </h2>
          <Link
            href="/mapel"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Semua mapel <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <Link href={subject.href}>
                <Card className="group h-full cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                    <div
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform group-hover:scale-110',
                        subject.color
                      )}
                    >
                      {subject.icon}
                    </div>
                    <div>
                      <p className="font-medium">{subject.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {subject.lessons} materi
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Daily Tasks + Achievements ──────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Tugas Harian</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {tasksDone}/{dailyTasks.length} selesai - {dailyXpEarned}/
                      {dailyXpTotal} XP hari ini
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-primary">
                    {stats.streak} hari
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                    task.done
                      ? 'border-success/30 bg-success/5'
                      : 'hover:bg-muted/30'
                  )}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        task.done && 'text-muted-foreground line-through'
                      )}
                    >
                      {task.title}
                    </p>
                  </div>
                  <Badge variant={task.done ? 'success' : 'warning'} size="sm">
                    <Zap className="h-3 w-3" /> +{task.xp} XP
                  </Badge>
                  {!task.done && (
                    <Button size="icon-sm" variant="ghost" asChild>
                      <Link href="/materi">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
              {dailyTasks.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Belum ada tugas harian hari ini.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-primary" />
              Pencapaian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border p-4 text-center',
                    a.earned ? 'border-primary/20 bg-primary/5' : 'opacity-50'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                    {a.earned ? (
                      a.icon
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs font-medium">{a.title}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/profile">Lihat Semua</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ── Recommendations ─────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-xl font-bold tracking-tight">
              Rekomendasi untuk Kamu
            </h2>
          </div>
          <Link
            href="/materi"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Lihat semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <Link href={`/materi/${rec.id}`}>
                <Card
                  variant="elevated"
                  className="group h-full cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl transition-transform group-hover:scale-110">
                        {rec.icon}
                      </div>
                      <Badge
                        variant={
                          rec.tag === 'Populer'
                            ? 'accent'
                            : rec.tag === 'Baru'
                              ? 'info'
                              : 'success'
                        }
                        size="sm"
                      >
                        {rec.tag}
                      </Badge>
                    </div>
                    <h3 className="font-medium leading-snug">{rec.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {rec.subject}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {rec.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        {rec.rating}
                      </span>
                      <span>{rec.students.toLocaleString()} siswa</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
