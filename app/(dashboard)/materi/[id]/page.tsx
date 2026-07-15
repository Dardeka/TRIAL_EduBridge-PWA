import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Users,
  Play,
  FileText,
  Download,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
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
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const materials: Record<
  string,
  {
    title: string;
    subject: string;
    level: string;
    type: 'video' | 'pdf';
    duration: string;
    students: number;
    rating: number;
    description: string;
    chapters: { title: string; duration: string; done: boolean }[];
  }
> = {
  '1': {
    title: 'Aljabar Linear - Sistem Persamaan',
    subject: 'Matematika',
    level: 'SMA',
    type: 'video',
    duration: '45 min',
    students: 320,
    rating: 4.8,
    description:
      'Pelajari konsep sistem persamaan linear, metode eliminasi, substitusi, dan grafik. Materi ini mencakup teori, contoh soal, dan latihan.',
    chapters: [
      { title: 'Pengenalan Sistem Persamaan', duration: '8 min', done: true },
      { title: 'Metode Eliminasi', duration: '12 min', done: true },
      { title: 'Metode Substitusi', duration: '10 min', done: false },
      { title: 'Metode Grafik', duration: '15 min', done: false },
    ],
  },
};

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const material = materials[id];

  if (!material) {
    const fallback = {
      title: 'Materi Pembelajaran',
      subject: 'Umum',
      level: 'SMA',
      type: 'video' as const,
      duration: '30 min',
      students: 250,
      rating: 4.5,
      description:
        'Materi pembelajaran interaktif dengan video penjelasan, dokumen PDF, dan kuis untuk menguji pemahaman Anda.',
      chapters: [
        { title: 'Pengenalan', duration: '10 min', done: true },
        { title: 'Konsep Dasar', duration: '15 min', done: false },
        { title: 'Latihan Soal', duration: '20 min', done: false },
      ],
    };
    return <MaterialDetail id={id} material={fallback} />;
  }

  return <MaterialDetail id={id} material={material} />;
}

function MaterialDetail({
  id,
  material,
}: {
  id: string;
  material: (typeof materials)[string];
}) {
  return (
    <div>
      <Link
        href="/materi"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
      </Link>

      <PageHeader title={material.title} description={material.subject}>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-3 font-heading text-lg font-semibold">
                Tentang Materi Ini
              </h3>
              <p className="text-muted-foreground">{material.description}</p>
            </CardContent>
          </Card>

          {/* Video/Content preview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                <div className="text-center">
                  {material.type === 'video' ? (
                    <Play className="mx-auto h-12 w-12 text-muted-foreground" />
                  ) : (
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {material.type === 'video'
                      ? 'Klik untuk memutar video'
                      : 'Klik untuk membuka PDF'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chapters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Daftar Bab
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {material.chapters.map((chapter, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {chapter.done ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${chapter.done ? 'text-muted-foreground line-through' : ''}`}
                    >
                      {chapter.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {chapter.duration}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
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
                    {material.chapters.filter((c) => c.done).length}/
                    {material.chapters.length}
                  </span>
                </div>
                <Progress
                  value={
                    (material.chapters.filter((c) => c.done).length /
                      material.chapters.length) *
                    100
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
