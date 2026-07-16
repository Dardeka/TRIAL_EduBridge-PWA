'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  Clock,
  Users,
  Play,
  FileText,
  Video,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input';
import { CardSkeleton } from '@/components/ui/skeleton-presets';

interface Material {
  _id: string;
  title: string;
  subject: { _id: string; name: string; icon: string } | null;
  level: string;
  type: 'video' | 'pdf' | 'text';
  duration: string;
  students: number;
  icon: string;
}

const filters = ['Semua', 'Video', 'PDF', 'SD', 'SMP', 'SMA'];

function MateriPageContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get('subject');

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchMaterials() {
      try {
        setLoading(true);
        const url = subjectId
          ? `/api/materials?subject=${subjectId}`
          : '/api/materials';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal memuat materi');
        const json = await res.json();
        setMaterials(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, [subjectId]);

  const filtered = materials.filter((m) => {
    const matchFilter =
      activeFilter === 'Semua' ||
      m.type === activeFilter.toLowerCase() ||
      m.level === activeFilter;
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject?.name.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Materi Pembelajaran"
        description="Jelajahi semua materi yang tersedia di EduBridge"
      />

      <div className="mb-6 space-y-4">
        <InputWithIcon
          placeholder="Cari materi atau mata pelajaran..."
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="py-20 text-center text-destructive">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((material) => (
            <Link key={material._id} href={`/materi/${material._id}`}>
              <Card variant="elevated" className="group h-full cursor-pointer">
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">
                      {material.icon}
                    </div>
                    <div className="flex gap-1.5">
                      <Badge
                        variant={material.type === 'video' ? 'info' : 'accent'}
                        size="sm"
                      >
                        {material.type === 'video' ? (
                          <>
                            <Video className="h-3 w-3" /> Video
                          </>
                        ) : (
                          <>
                            <FileText className="h-3 w-3" /> PDF
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base">{material.title}</CardTitle>
                  <CardDescription>
                    {material.subject?.name ?? '-'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {material.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {material.students}
                      </span>
                    </div>
                    <Badge variant="secondary" size="sm">
                      {material.level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          Tidak ada materi yang ditemukan
        </div>
      )}
    </div>
  );
}

export default function MateriPage() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <MateriPageContent />
    </Suspense>
  );
}
