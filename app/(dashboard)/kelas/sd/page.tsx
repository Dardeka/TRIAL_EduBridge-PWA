'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Star, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const grades = [
  {
    number: 1,
    title: 'Kelas 1',
    description: 'Pengenalan dasar membaca, menulis, dan berhitung',
    subjects: 9,
    materials: 45,
    students: 820,
    progress: 0,
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    icon: '🌱',
    tag: 'Mulai',
  },
  {
    number: 2,
    title: 'Kelas 2',
    description: 'Membaca lancar, penjumlahan, dan pengurangan',
    subjects: 9,
    materials: 52,
    students: 760,
    progress: 15,
    color: 'from-teal-400 to-cyan-500',
    bg: 'bg-teal-50',
    icon: '📖',
    tag: null,
  },
  {
    number: 3,
    title: 'Kelas 3',
    description: 'Pemahaman bacaan, perkalian, dan pembagian dasar',
    subjects: 9,
    materials: 58,
    students: 710,
    progress: 30,
    color: 'from-cyan-400 to-sky-500',
    bg: 'bg-cyan-50',
    icon: '✏️',
    tag: null,
  },
  {
    number: 4,
    title: 'Kelas 4',
    description: 'Pecahan, sains terapan, dan menulis karangan',
    subjects: 9,
    materials: 64,
    students: 680,
    progress: 45,
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    icon: '🔬',
    tag: 'Populer',
  },
  {
    number: 5,
    title: 'Kelas 5',
    description: 'Aljabar pengenalan, geografi, dan sejarah nasional',
    subjects: 9,
    materials: 70,
    students: 650,
    progress: 60,
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    icon: '🧮',
    tag: 'Populer',
  },
  {
    number: 6,
    title: 'Kelas 6',
    description: 'Persiapan ujian akhir dan transisi ke SMP',
    subjects: 9,
    materials: 78,
    students: 580,
    progress: 75,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    icon: '🎯',
    tag: 'Ujian',
  },
];

export default function KelasSDPage() {
  return (
    <div>
      <PageHeader
        title="Tingkat SD"
        description="Sekolah Dasar - Pilih kelas untuk mulai belajar"
      />

      {/* Summary banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-6 text-white">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">
                Sekolah Dasar
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Kelas 1 sampai 6 - Fondasi pendidikan untuk masa depan
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold">6</p>
                <p className="text-xs text-primary-foreground/80">Kelas</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold">367</p>
                <p className="text-xs text-primary-foreground/80">Materi</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold">4.2K</p>
                <p className="text-xs text-primary-foreground/80">Siswa</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grade cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grades.map((grade, i) => (
          <motion.div
            key={grade.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <Link href={`/kelas/sd?grade=${grade.number}`}>
              <Card
                variant="elevated"
                className="group h-full cursor-pointer overflow-hidden"
              >
                {/* Top gradient strip */}
                <div className={`h-2 w-full bg-gradient-to-r ${grade.color}`} />

                <CardContent className="pt-6">
                  {/* Header row */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${grade.bg} text-2xl transition-transform group-hover:scale-110`}
                      >
                        {grade.icon}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold">
                          {grade.title}
                        </h3>
                        {grade.tag && (
                          <Badge
                            variant={
                              grade.tag === 'Populer'
                                ? 'accent'
                                : grade.tag === 'Ujian'
                                  ? 'destructive'
                                  : 'info'
                            }
                            size="sm"
                            className="mt-1"
                          >
                            {grade.tag === 'Populer' && (
                              <Star className="h-3 w-3" />
                            )}
                            {grade.tag}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {grade.description}
                  </p>

                  {/* Stats row */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      {grade.materials} materi
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {grade.students} siswa
                    </span>
                  </div>

                  {/* Progress */}
                  {grade.progress > 0 ? (
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Progress kelas
                        </span>
                        <span className="font-medium text-primary">
                          {grade.progress}%
                        </span>
                      </div>
                      <Progress value={grade.progress} size="sm" />
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Clock className="h-3.5 w-3.5" />
                      Belum dimulai
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
