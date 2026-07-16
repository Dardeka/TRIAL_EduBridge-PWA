'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { UploadCloud, FileText, Video, X, Check, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const uploadSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter').max(200),
  subjectId: z.string().min(1, 'Pilih mata pelajaran'),
  level: z.enum(['SD', 'SMP', 'SMA'], { required_error: 'Pilih jenjang' }),
  description: z.string().optional(),
});

const fileTypes = [
  { id: 'pdf', label: 'PDF Document', icon: FileText, accept: '.pdf' },
  { id: 'video', label: 'Video', icon: Video, accept: 'video/*' },
];

const levels = ['SD', 'SMP', 'SMA'];

interface Subject {
  _id: string;
  name: string;
}

export default function AdminUploadPage() {
  const router = useRouter();
  const [fileType, setFileType] = useState<'pdf' | 'video'>('pdf');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'review' | 'published'>(
    'draft'
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch('/api/subjects-list');
        const json = await res.json();
        setSubjects(json.data || []);
      } catch (err) {
        setSubjects([]);
      }
    }
    fetchSubjects();
  }, []);

  const pickFile = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) {
      pickFile(e.dataTransfer.files[0]);
    }
  };

  const formatSize = (bytes: number) =>
    `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedFile) {
      setError('Pilih file terlebih dahulu.');
      return;
    }

    const result = uploadSchema.safeParse({
      title,
      subjectId,
      level,
      description,
    });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      setUploading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      // 1. Upload file ke Vercel Blob
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await fetch('/api/admin/upload-file', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || 'Gagal mengupload file');
      }
      const uploadJson = await uploadRes.json();
      const fileUrl = uploadJson.data.url;

      // 2. Simpan metadata materi ke MongoDB
      const materialRes = await fetch('/api/admin/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subject: subjectId,
          level,
          description,
          type: fileType,
          status,
          fileSize: formatSize(selectedFile.size),
          chapters: [
            {
              title: 'Bagian 1',
              order: 1,
              ...(fileType === 'video'
                ? { videoUrl: fileUrl }
                : { pdfUrl: fileUrl }),
            },
          ],
        }),
      });

      if (!materialRes.ok) {
        const err = await materialRes.json();
        throw new Error(err.error || 'Gagal menyimpan materi');
      }

      setSuccess(true);
      toast.success('Materi berhasil diupload!');
      setTimeout(() => router.push('/admin/materi'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Upload Materi"
        description="Unggah materi pembelajaran baru"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload form */}
        <div className="space-y-6 lg:col-span-2">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertDescription>
                Materi berhasil diupload! Mengalihkan...
              </AlertDescription>
            </Alert>
          )}

          {/* File type selector */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Tipe File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {fileTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setFileType(type.id as 'pdf' | 'video');
                        setSelectedFile(null);
                      }}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-lg border-2 p-6 transition-colors',
                        fileType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/30'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-8 w-8',
                          fileType === type.id
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        )}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Drop zone */}
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Tarik file ke sini atau klik untuk memilih
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors',
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40'
                )}
              >
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm font-medium">
                  Tarik file ke sini atau{' '}
                  <label className="cursor-pointer text-primary hover:underline">
                    pilih file
                    <input
                      type="file"
                      className="hidden"
                      accept={fileTypes.find((t) => t.id === fileType)?.accept}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          pickFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fileType === 'pdf'
                    ? 'PDF hingga 50MB'
                    : 'MP4, WebM hingga 500MB'}
                </p>
              </div>

              {selectedFile && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    {fileType === 'pdf' ? (
                      <FileText className="h-5 w-5 text-destructive" />
                    ) : (
                      <Video className="h-5 w-5 text-info" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSize(selectedFile.size)}
                      </p>
                    </div>
                    <Badge variant="success" size="sm">
                      <Check className="h-3 w-3" /> Siap
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata form */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Materi</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Materi</Label>
                  <Input
                    id="title"
                    placeholder="Contoh: Aljabar Linear - Sistem Persamaan"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Mata Pelajaran</Label>
                    <select
                      id="subject"
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Pilih mata pelajaran</option>
                      {subjects.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Jenjang</Label>
                    <select
                      id="level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Pilih jenjang</option>
                      {levels.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi singkat tentang materi..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                <Button type="submit" className="gap-2" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Mengupload...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-4 w-4" /> Upload Materi
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar tips */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tips Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <FileText className="mr-2 inline h-4 w-4 text-primary" />
                Pastikan judul materi jelas dan deskriptif
              </p>
              <p>
                <FileText className="mr-2 inline h-4 w-4 text-primary" />
                Pilih mata pelajaran dan jenjang yang tepat
              </p>
              <p>
                <FileText className="mr-2 inline h-4 w-4 text-primary" />
                Tambahkan deskripsi untuk membantu siswa
              </p>
              <p>
                <FileText className="mr-2 inline h-4 w-4 text-primary" />
                Video sebaiknya maksimal 30 menit
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
