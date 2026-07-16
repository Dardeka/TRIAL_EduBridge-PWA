'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InputWithIcon } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminMaterial {
  _id: string;
  title: string;
  subject: { name: string } | null;
  level: string;
  type: 'video' | 'pdf' | 'text';
  status: 'draft' | 'review' | 'published';
  createdAt: string;
  views: number;
}

const statusFilters = ['Semua', 'published', 'review', 'draft'];

export default function AdminMateriPage() {
  const [allMateri, setAllMateri] = useState<AdminMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const fetchMateri = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/materials', {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat materi');
      const json = await res.json();
      setAllMateri(json.data);
    } catch (err) {
      setAllMateri([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMateri();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Hapus materi "${title}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch(`/api/admin/materials?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (!res.ok) throw new Error('Gagal menghapus materi');
      setAllMateri((prev) => prev.filter((m) => m._id !== id));
      toast.success('Materi berhasil dihapus');
    } catch (err) {
      toast.error('Gagal menghapus materi');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const filtered = allMateri.filter((m) => {
    const matchFilter = filter === 'Semua' || m.status === filter;
    const matchSearch =
      !search || m.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <PageHeader title="Kelola Materi" description="Semua materi pembelajaran">
        <Button className="gap-2" asChild>
          <Link href="/admin/upload">
            <Plus className="h-4 w-4" /> Tambah Materi
          </Link>
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
          {loading && (
            <div className="py-12 text-center text-muted-foreground">
              Memuat materi...
            </div>
          )}

          {!loading && (
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
                  {filtered.map((materi) => (
                    <tr
                      key={materi._id}
                      className="border-b text-sm last:border-0 hover:bg-muted/30"
                    >
                      <td className="py-3 font-medium">{materi.title}</td>
                      <td className="py-3 text-muted-foreground">
                        {materi.subject?.name ?? '-'}
                      </td>
                      <td className="py-3">
                        <Badge variant="secondary" size="sm">
                          {materi.level}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={materi.type === 'video' ? 'info' : 'accent'}
                          size="sm"
                        >
                          {materi.type === 'video' ? 'Video' : 'PDF'}
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
                          <Button variant="ghost" size="icon-sm" asChild>
                            <Link
                              href={`/materi/${materi._id}`}
                              target="_blank"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon-sm" asChild>
                            <Link href={`/admin/materi/${materi._id}/edit`}>
                              <Edit className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive"
                            onClick={() =>
                              handleDelete(materi._id, materi.title)
                            }
                            disabled={deletingId === materi._id}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Tidak ada materi yang cocok dengan filter.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
