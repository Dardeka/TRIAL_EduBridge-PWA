'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Play,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const stats = [
  { label: 'Siswa Aktif', value: '12,000+', icon: Users },
  { label: 'Materi', value: '500+', icon: BookOpen },
  { label: 'Guru', value: '80+', icon: GraduationCap },
  { label: 'Sertifikat', value: '3,500+', icon: Award },
];

const levels = [
  {
    title: 'SD',
    description: 'Kelas 1-6',
    href: '/kelas/sd',
    color: 'from-primary-400 to-primary-600',
    count: '120+ materi',
  },
  {
    title: 'SMP',
    description: 'Kelas 7-9',
    href: '/kelas/smp',
    color: 'from-accent-400 to-accent-600',
    count: '180+ materi',
  },
  {
    title: 'SMA',
    description: 'Kelas 10-12',
    href: '/kelas/sma',
    color: 'from-info to-primary-500',
    count: '200+ materi',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Materi Lengkap',
    description:
      'Ribuan materi pembelajaran untuk SD, SMP, dan SMA dengan kurikulum terbaru.',
  },
  {
    icon: Play,
    title: 'Video Interaktif',
    description:
      'Video pembelajaran berkualitas tinggi yang memudahkan pemahaman konsep.',
  },
  {
    icon: Award,
    title: 'Sertifikat Resmi',
    description:
      'Dapatkan sertifikat setelah menyelesaikan kursus dan kuis dengan baik.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Pantau perkembangan belajar dengan dashboard analitik yang detail.',
  },
  {
    icon: Users,
    title: 'Komunitas Aktif',
    description:
      'Belajar bersama ribuan siswa lain dalam komunitas yang suportif.',
  },
  {
    icon: CheckCircle2,
    title: 'Kuis & Latihan',
    description:
      'Uji pemahaman dengan kuis interaktif dan latihan soal otomatis.',
  },
];

const testimonials = [
  {
    name: 'Siti Rahayu',
    role: 'Siswa SMA',
    initials: 'SR',
    rating: 5,
    text: 'EduBridge sangat membantu saya belajar. Materinya lengkap dan videonya mudah dipahami.',
  },
  {
    name: 'Pak Hendra',
    role: 'Guru Matematika',
    initials: 'PH',
    rating: 5,
    text: 'Platform yang luar biasa untuk mengajar. Saya bisa upload materi dan pantau progress siswa.',
  },
  {
    name: 'Dimas Pratama',
    role: 'Siswa SMP',
    initials: 'DP',
    rating: 5,
    text: 'Kuisnya seru dan sertifikatnya memotivasi saya untuk terus belajar.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 70%, hsl(var(--accent) / 0.06) 0%, transparent 50%)',
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="secondary" className="gap-1.5 px-4 py-1.5">
                <Star className="h-3.5 w-3.5 text-accent" />
                Platform belajar #1 di Indonesia
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Belajar jadi lebih{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                menyenangkan
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              Akses ribuan materi pembelajaran untuk SD, SMP, dan SMA. Video
              interaktif, kuis, dan sertifikat resmi dalam satu platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button size="lg" className="gap-2" asChild>
                <Link href="/register">
                  Mulai Belajar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/kelas">Lihat Kelas</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-lg border bg-card p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Levels */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Pilih Jenjang Kelas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Materi disesuaikan dengan kurikulum setiap jenjang
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {levels.map((level, i) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={level.href}>
                  <Card
                    variant="elevated"
                    className="group h-full cursor-pointer"
                  >
                    <CardHeader>
                      <div
                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${level.color} text-white`}
                      >
                        <GraduationCap className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">{level.title}</CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {level.count}
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Kenapa EduBridge?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Semua yang kamu butuhkan untuk belajar dalam satu platform
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="group h-full">
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Kata Mereka
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ribuan siswa dan guru telah merasakan manfaat EduBridge
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-gradient-to-br from-primary to-primary-600 p-12 text-white"
          >
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Siap mulai perjalanan belajarmu?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Bergabung gratis hari ini dan akses 500+ materi pembelajaran
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="accent"
                className="gap-2"
                asChild
              >
                <Link href="/register">
                  Daftar Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/login">Sudah punya akun?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
