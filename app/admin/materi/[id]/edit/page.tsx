'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

interface Subject {
  _id: string;
  name: string;
}

interface MaterialData {
  _id: string;
  title: string;
  subject: { _id: string; name: string } | string;
  level: 'SD' | 'SMP' | 'SMA';
  description: string;
  type: 'video' | 'pdf' | 'text';
  status: 'draft' | 'review' | 'published';
}

export default function EditMateriPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState<'SD' | 'SMP' | 'SMA' | ''>('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState<'draft' | 'review' | 'published'>(
    'draft'
  );
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const headers = { Authorization: `Bearer ${session?.access_token}` };

        const [materialRes, subjectsRes] = await Promise.all([
          fetch(`/api/admin/materials?id=${id}`, { headers }),
          fetch('/api/subjects-list', { headers }),
        ]);

        if (!materialRes.ok) throw new Error('Gagal memuat materi');
        const materialJson = await materialRes.json();
        const m: MaterialData = materialJson.data;

        setTitle(m.title ?? '');
        setSubject(
          typeof m.subject === 'object' ? m.subject._id : (m.subject ?? '')
        );
        setLevel(m.level ?? '');
        setDescription(m.description ?? '');
        setType(m.type ?? '');
        setStatus(m.status ?? 'draft');

        if (subjectsRes.ok) {
          const subjectsJson = await subjectsRes.json();
          setSubjects(subjectsJson.data ?? []);
        }
      } catch (err) {
        setError('Gagal memuat data materi. Coba muat ulang halaman.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch('/api/admin/materials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          id,
          title,
          subject,
          level,
          description,
          status,
        }),
      });

      if (!res.ok) throw new Error('Gagal menyimpan perubahan');

      router.push('/admin/materi');
    } catch (err) {
      setError('Gagal menyimpan perubahan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">
          Memuat data materi...
        </span>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Materi"
        description="Ubah informasi materi pembelajaran"
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul materi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Mata Pelajaran</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mata pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Jenjang</Label>
              <Select
                value={level}
                onValueChange={(v) => setLevel(v as 'SD' | 'SMP' | 'SMA')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenjang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SD">SD</SelectItem>
                  <SelectItem value="SMP">SMP</SelectItem>
                  <SelectItem value="SMA">SMA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi singkat tentang materi..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipe</Label>
              <p className="text-sm capitalize text-muted-foreground">{type}</p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) =>
                  setStatus(v as 'draft' | 'review' | 'published')
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/materi')}
              >
                Batal
              </Button>
              <Button type="submit" disabled={saving} className="gap-2">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
