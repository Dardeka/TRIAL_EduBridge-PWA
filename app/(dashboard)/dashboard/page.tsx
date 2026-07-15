'use client';

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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/providers/auth-provider';
import { cn } from '@/lib/utils';

// ── Mock data ──────────────────────────────────────────────
const xp = 2450;
const xpToNextLevel = 3000;
const xpPercent = Math.round((xp / xpToNextLevel) * 100);
const level = 7;
const streak = 12;

const continueLearning = [
  { id: '1', title: 'Aljabar Linear - Sistem Persamaan', subject: 'Matematika', level: 'SMA', progress: 75, icon: '📐', duration: '12 menit tersisa' },
  { id: '2', title: 'Tenses in English Grammar', subject: 'Bahasa Inggris', level: 'SMP', progress: 40, icon: '📖', duration: '18 menit tersisa' },
  { id: '3', title: 'Sistem Pencernaan Manusia', subject: 'IPA', level: 'SD', progress: 90, icon: '🧬', duration: '3 menit tersisa' },
];

const subjects = [
  { title: 'Matematika', icon: '📐', color: 'bg-primary/10 text-primary', href: '/mapel', lessons: 96 },
  { title: 'Bahasa Indonesia', icon: '📚', color: 'bg-accent/15 text-accent-foreground', href: '/mapel', lessons: 74 },
  { title: 'IPA', icon: '🔬', color: 'bg-success/15 text-success', href: '/mapel', lessons: 48 },
  { title: 'Bahasa Inggris', icon: '🌐', color: 'bg-info/15 text-info', href: '/mapel', lessons: 70 },
  { title: 'Fisika', icon: '⚛️', color: 'bg-primary/10 text-primary', href: '/mapel', lessons: 28 },
  { title: 'Sejarah', icon: '🏛️', color: 'bg-warning/15 text-warning', href: '/mapel', lessons: 20 },
  { title: 'Informatika', icon: '💻', color: 'bg-accent/15 text-accent-foreground', href: '/mapel', lessons: 42 },
  { title: 'PPKn', icon: '🇮🇩', color: 'bg-destructive/15 text-destructive', href: '/mapel', lessons: 46 },
];

const dailyTasks = [
  { id: 't1', title: 'Selesaikan 1 video Matematika', xp: 50, done: true, type: 'video' },
  { id: 't2', title: 'Kuis: Tenses Bahasa Inggris', xp: 100, done: false, type: 'quiz' },
  { id: 't3', title: 'Baca 1 materi IPA', xp: 30, done: false, type: 'read' },
  { id: 't4', title: 'Latihan soal Fisika', xp: 80, done: false, type: 'practice' },
];

const recommendations = [
  { id: 'r1', title: 'Persamaan Kuadrat', subject: 'Matematika', level: 'SMP', duration: '35 min', rating: 4.9, students: 4100, icon: '📊', tag: 'Populer' },
  { id: 'r2', title: 'Rangkaian Listrik Dasar', subject: 'Fisika', level: 'SMA', duration: '40 min', rating: 4.8, students: 2900, icon: '⚡', tag: 'Baru' },
  { id: 'r3', title: 'Ekosistem dan Keseimbangan', subject: 'Biologi', level: 'SMA', duration: '30 min', rating: 4.7, students: 2600, icon: '🌱', tag: 'Rekomendasi' },
];

const achievements = [
  { title: 'Quiz Master', icon: '🧠', earned: true },
  { title: 'Streak 7 Hari', icon: '🔥', earned: true },
  { title: 'Fast Learner', icon: '⚡', earned: true },
  { title: 'Bookworm', icon: '📚', earned: false },
];

// ── Component ─────────────────────────────────────────────

export default function DashboardPage() {
  const { user, isGuest } = useAuth();
  const userName = user?.fullName || 'Budi';
  const tasksDone = dailyTasks.filter((t) => t.done).length;
  const dailyXpEarned = dailyTasks.filter((t) => t.done).reduce((sum, t) => sum + t.xp, 0);
  const dailyXpTotal = dailyTasks.reduce((sum, t) => sum + t.xp, 0);

  return (
    <div className="space-y-6">
      {/* ── Guest Banner ─────────────────────────────── */}
      {isGuest && (
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Anda dalam Mode Tamu</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Progress tidak akan disimpan. Daftar untuk menyimpan hasil
              belajar Anda.
            </span>
            <Button size="sm" variant="accent" className="gap-2 ml-4 shrink-0" asChild>
              <Link href="/register">
                <UserPlus className="h-4 w-4" /> Daftar
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* ── Hero Banner ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-6 text-white sm:p-8">
          {/* Decorative blobs */}
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: greeting + level/XP */}
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-primary-foreground/80">
                  Hai,
                </span>
                <span className="text-lg font-bold">{userName}!</span>
                <Badge className="border-white/30 bg-white/15 text-white">
                  <Trophy className="h-3 w-3" /> Level {level}
                </Badge>
              </div>

              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Siap belajar hari ini?
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Lanjutkan perjalanan belajarmu dan kumpulkan XP!
              </p>

              {/* XP bar */}
              <div className="mt-5 max-w-md">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Zap className="h-4 w-4 text-accent" />
                    {xp.toLocaleString()} XP
                  </span>
                  <span className="text-primary-foreground/70">
                    {(xpToNextLevel - xp).toLocaleString()} XP ke Level {level + 1}
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

            {/* Right: streak + stats */}
            <div className="flex gap-3 sm:gap-4">
              {/* Streak */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-white/15 px-5 py-4 backdrop-blur-sm">
                <Flame className="h-7 w-7 text-accent" />
                <p className="mt-1.5 font-heading text-2xl font-bold">{streak}</p>
                <p className="text-xs text-primary-foreground/80">Hari Beruntun</p>
              </div>
              {/* Total XP */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-white/15 px-5 py-4 backdrop-blur-sm">
                <Star className="h-7 w-7 text-accent" />
                <p className="mt-1.5 font-heading text-2xl font-bold">{xp.toLocaleString()}</p>
                <p className="text-xs text-primary-foreground/80">Total XP</p>
              </div>
              {/* Rank */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-white/15 px-5 py-4 backdrop-blur-sm">
                <Trophy className="h-7 w-7 text-accent" />
                <p className="mt-1.5 font-heading text-2xl font-bold">#42</p>
                <p className="text-xs text-primary-foreground/80">Ranking</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Stats Row ──────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Materi Selesai', value: '24', icon: CheckCircle2, color: 'bg-success/10 text-success' },
          { label: 'Sedang Berjalan', value: '6', icon: Play, color: 'bg-primary/10 text-primary' },
          { label: 'Sertifikat', value: '8', icon: Award, color: 'bg-accent/15 text-accent-foreground' },
          { label: 'Jam Belajar', value: '127', icon: Clock, color: 'bg-info/15 text-info' },
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
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 font-heading text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ── Continue Learning ───────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold tracking-tight">
            Lanjutkan Belajar
          </h2>
          <Link href="/materi" className="flex items-center gap-1 text-sm text-primary hover:underline">
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
                <Card variant="elevated" className="group h-full cursor-pointer">
                  <CardContent className="pt-6">
                    {/* Thumbnail */}
                    <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 text-4xl">
                      <span className="transition-transform group-hover:scale-110">
                        {course.icon}
                      </span>
                      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary" size="sm">{course.level}</Badge>
                      <span className="text-xs text-muted-foreground">{course.subject}</span>
                    </div>
                    <h3 className="font-medium leading-snug">{course.title}</h3>

                    {/* Progress */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{course.duration}</span>
                        <span className="font-medium text-primary">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Subject Cards ───────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold tracking-tight">
            Mata Pelajaran
          </h2>
          <Link href="/mapel" className="flex items-center gap-1 text-sm text-primary hover:underline">
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
                    <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform group-hover:scale-110', subject.color)}>
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
        {/* Daily Tasks */}
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
                      {tasksDone}/{dailyTasks.length} selesai - {dailyXpEarned}/{dailyXpTotal} XP hari ini
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-primary">{streak} hari</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                    task.done ? 'border-success/30 bg-success/5' : 'hover:bg-muted/30'
                  )}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p className={cn('text-sm font-medium', task.done && 'text-muted-foreground line-through')}>
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
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
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
                    {a.earned ? a.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
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
          <Link href="/materi" className="flex items-center gap-1 text-sm text-primary hover:underline">
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
                <Card variant="elevated" className="group h-full cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl transition-transform group-hover:scale-110">
                        {rec.icon}
                      </div>
                      <Badge
                        variant={rec.tag === 'Populer' ? 'accent' : rec.tag === 'Baru' ? 'info' : 'success'}
                        size="sm"
                      >
                        {rec.tag}
                      </Badge>
                    </div>
                    <h3 className="font-medium leading-snug">{rec.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{rec.subject}</p>

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
