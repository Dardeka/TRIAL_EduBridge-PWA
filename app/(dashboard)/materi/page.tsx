'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, Users, Play, FileText, Video } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input';

const materials = [
  { id: '1', title: 'Aljabar Linear - Sistem Persamaan', subject: 'Matematika', level: 'SMA', type: 'video', duration: '45 min', students: 320, icon: '📐' },
  { id: '2', title: 'Sistem Pencernaan Manusia', subject: 'IPA', level: 'SD', type: 'pdf', duration: '20 min', students: 180, icon: '🧬' },
  { id: '3', title: 'Tenses in English Grammar', subject: 'Bahasa Inggris', level: 'SMP', type: 'video', duration: '30 min', students: 450, icon: '📖' },
  { id: '4', title: 'Proklamasi Kemerdekaan', subject: 'Sejarah', level: 'SMA', type: 'pdf', duration: '25 min', students: 210, icon: '🏛️' },
  { id: '5', title: 'Pengenalan Pemrograman', subject: 'Informatika', level: 'SMP', type: 'video', duration: '60 min', students: 380, icon: '💻' },
  { id: '6', title: 'Rangkaian Listrik Dasar', subject: 'Fisika', level: 'SMA', type: 'video', duration: '40 min', students: 290, icon: '⚡' },
  { id: '7', title: 'Tata Surya dan Planet', subject: 'IPA', level: 'SD', type: 'pdf', duration: '15 min', students: 150, icon: '🪐' },
  { id: '8', title: 'Persamaan Kuadrat', subject: 'Matematika', level: 'SMP', type: 'video', duration: '35 min', students: 410, icon: '📊' },
  { id: '9', title: 'Ekosistem dan Keseimbangan', subject: 'Biologi', level: 'SMA', type: 'pdf', duration: '30 min', students: 260, icon: '🌱' },
];

const filters = ['Semua', 'Video', 'PDF', 'SD', 'SMP', 'SMA'];

export default function MateriPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = materials.filter((m) => {
    const matchFilter =
      activeFilter === 'Semua' ||
      m.type === activeFilter.toLowerCase() ||
      m.level === activeFilter;
    const matchSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Materi Pembelajaran"
        description="Jelajahi semua materi yang tersedia di EduBridge"
      />

      {/* Search + filters */}
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

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((material) => (
          <Link key={material.id} href={`/materi/${material.id}`}>
            <Card variant="elevated" className="group h-full cursor-pointer">
              <CardHeader>
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">
                    {material.icon}
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant={material.type === 'video' ? 'info' : 'accent'} size="sm">
                      {material.type === 'video' ? (
                        <><Video className="h-3 w-3" /> Video</>
                      ) : (
                        <><FileText className="h-3 w-3" /> PDF</>
                      )}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-base">{material.title}</CardTitle>
                <CardDescription>{material.subject}</CardDescription>
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

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          Tidak ada materi yang ditemukan
        </div>
      )}
    </div>
  );
}
