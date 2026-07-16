'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const LEVEL_META: Record<
  string,
  { description: string; color: string; href: string }
> = {
  SD: {
    description: 'Sekolah Dasar - Kelas 1 sampai 6',
    color: 'from-primary-400 to-primary-600',
    href: '/kelas/sd',
  },
  SMP: {
    description: 'Sekolah Menengah Pertama - Kelas 7 sampai 9',
    color: 'from-accent-400 to-accent-600',
    href: '/kelas/smp',
  },
  SMA: {
    description: 'Sekolah Menengah Atas - Kelas 10 sampai 12',
    color: 'from-info to-primary-500',
    href: '/kelas/sma',
  },
};

interface LevelData {
  level: string;
  materialCount: number;
  studentCount: number;
}

export default function KelasPage() {
  const [levels, setLevels] = useState<LevelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverview() {
      try {
        setLoading(true);
        const res = await fetch('/api/kelas-overview');
        if (!res.ok) throw new Error('Gagal memuat data kelas');
        const json = await res.json();
        setLevels(json.data);
      } catch (err) {
        setLevels([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOverview();
  }, []);

  return (
    <div>
      <PageHeader
        title="Pilih Jenjang Kelas"
        description="Temukan materi berdasarkan jenjang pendidikan"
      />

      {loading && (
        <div className="py-20 text-center text-muted-foreground">
          Memuat data kelas...
        </div>
      )}

      {!loading && (
        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level) => {
            const meta = LEVEL_META[level.level];
            return (
              <Link key={level.level} href={meta.href}>
                <Card
                  variant="elevated"
                  className="group h-full cursor-pointer"
                >
                  <CardHeader>
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white`}
                    >
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">{level.level}</CardTitle>
                    <CardDescription>{meta.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {level.studentCount.toLocaleString('id-ID')}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          {level.materialCount}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
