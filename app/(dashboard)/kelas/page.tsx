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
import { Badge } from '@/components/ui/badge';

const levels = [
  {
    title: 'SD',
    description: 'Sekolah Dasar - Kelas 1 sampai 6',
    href: '/kelas/sd',
    studentCount: '4,200',
    materialCount: '120+',
    color: 'from-primary-400 to-primary-600',
  },
  {
    title: 'SMP',
    description: 'Sekolah Menengah Pertama - Kelas 7 sampai 9',
    href: '/kelas/smp',
    studentCount: '3,800',
    materialCount: '180+',
    color: 'from-accent-400 to-accent-600',
  },
  {
    title: 'SMA',
    description: 'Sekolah Menengah Atas - Kelas 10 sampai 12',
    href: '/kelas/sma',
    studentCount: '4,000',
    materialCount: '200+',
    color: 'from-info to-primary-500',
  },
];

export default function KelasPage() {
  return (
    <div>
      <PageHeader
        title="Pilih Jenjang Kelas"
        description="Temukan materi berdasarkan jenjang pendidikan"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {levels.map((level) => (
          <Link key={level.title} href={level.href}>
            <Card
              variant="elevated"
              className="group h-full cursor-pointer"
            >
              <CardHeader>
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${level.color} text-white`}
                >
                  <GraduationCap className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {level.studentCount}
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
        ))}
      </div>
    </div>
  );
}
