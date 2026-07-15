import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const subjects = [
  { title: 'Matematika', icon: '📐', count: 96, levels: ['SD', 'SMP', 'SMA'] },
  { title: 'Bahasa Indonesia', icon: '📚', count: 74, levels: ['SD', 'SMP', 'SMA'] },
  { title: 'IPA', icon: '🔬', count: 48, levels: ['SD', 'SMP'] },
  { title: 'Fisika', icon: '⚛️', count: 28, levels: ['SMA'] },
  { title: 'Kimia', icon: '🧪', count: 26, levels: ['SMA'] },
  { title: 'Biologi', icon: '🧬', count: 24, levels: ['SMA'] },
  { title: 'Bahasa Inggris', icon: '🌐', count: 70, levels: ['SD', 'SMP', 'SMA'] },
  { title: 'Sejarah', icon: '🏛️', count: 20, levels: ['SMP', 'SMA'] },
  { title: 'Geografi', icon: '🗺️', count: 18, levels: ['SMP', 'SMA'] },
  { title: 'Ekonomi', icon: '💰', count: 22, levels: ['SMA'] },
  { title: 'Informatika', icon: '💻', count: 42, levels: ['SD', 'SMP', 'SMA'] },
  { title: 'PPKn', icon: '🇮🇩', count: 46, levels: ['SD', 'SMP', 'SMA'] },
];

export default function MapelPage() {
  return (
    <div>
      <PageHeader
        title="Mata Pelajaran"
        description="Jelajahi semua mata pelajaran yang tersedia"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.title} href="/materi">
            <Card variant="elevated" className="group h-full cursor-pointer">
              <CardHeader>
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">
                  {subject.icon}
                </div>
                <CardTitle>{subject.title}</CardTitle>
                <CardDescription>
                  {subject.count} materi tersedia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {subject.levels.map((level) => (
                      <Badge key={level} variant="secondary" size="sm">
                        {level}
                      </Badge>
                    ))}
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
