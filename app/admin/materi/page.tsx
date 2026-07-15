'use client';

import { useState } from 'react';
import { Search, Edit, Trash2, Eye, MoreHorizontal, Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InputWithIcon } from '@/components/ui/input';

const allMateri = [
  { title: 'Aljabar Linear', subject: 'Matematika', level: 'SMA', type: 'PDF', status: 'published', date: '15 Jun 2025', views: 3200 },
  { title: 'Sistem Pencernaan', subject: 'IPA', level: 'SD', type: 'Video', status: 'published', date: '10 Jun 2025', views: 2100 },
  { title: 'Tenses in English', subject: 'Bahasa Inggris', level: 'SMP', type: 'Video', status: 'published', date: '8 Jun 2025', views: 2800 },
  { title: 'Proklamasi Kemerdekaan', subject: 'Sejarah', level: 'SMA', type: 'PDF', status: 'review', date: '5 Jun 2025', views: 1500 },
  { title: 'Pemrograman Dasar', subject: 'Informatika', level: 'SMP', type: 'Video', status: 'published', date: '1 Jun 2025', views: 3800 },
  { title: 'Rangkaian Listrik', subject: 'Fisika', level: 'SMA', type: 'Video', status: 'draft', date: '28 May 2025', views: 0 },
  { title: 'Tata Surya', subject: 'IPA', level: 'SD', type: 'PDF', status: 'published', date: '25 May 2025', views: 1800 },
  { title: 'Persamaan Kuadrat', subject: 'Matematika', level: 'SMP', type: 'Video', status: 'published', date: '20 May 2025', views: 4100 },
];

const statusFilters = ['Semua', 'published', 'review', 'draft'];

export default function AdminMateriPage() {
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = allMateri.filter((m) => {
    const matchFilter = filter === 'Semua' || m.status === filter;
    const matchSearch =
      !search || m.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <PageHeader
        title="Kelola Materi"
        description="Semua materi pembelajaran"
      >
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Materi
        </Button>
      </PageHeader>

      <div className="mb-6 space-y-4">
        <InputWithIcon
          placeholder="Cari materi..."
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'published'
                ? 'Published'
                : f === 'review'
                  ? 'Review'
                  : f === 'draft'
                    ? 'Draft'
                    : 'Semua'}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Judul</th>
                  <th className="pb-3 font-medium">Mapel</th>
                  <th className="pb-3 font-medium">Jenjang</th>
                  <th className="pb-3 font-medium">Tipe</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Views</th>
                  <th className="pb-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((materi, i) => (
                  <tr
                    key={i}
                    className="border-b text-sm last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-3 font-medium">{materi.title}</td>
                    <td className="py-3 text-muted-foreground">
                      {materi.subject}
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary" size="sm">
                        {materi.level}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={materi.type === 'Video' ? 'info' : 'accent'}
                        size="sm"
                      >
                        {materi.type}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          materi.status === 'published'
                            ? 'success'
                            : materi.status === 'review'
                              ? 'warning'
                              : 'secondary'
                        }
                        size="sm"
                      >
                        {materi.status === 'published'
                          ? 'Publish'
                          : materi.status === 'review'
                            ? 'Review'
                            : 'Draft'}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {materi.views.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
