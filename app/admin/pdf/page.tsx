'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText as FilePdf,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

interface PdfMaterial {
  _id: string;
  title: string;
  subject: { name: string } | null;
  level: string;
  fileSize: string;
  chapters: { pdfUrl?: string }[];
  views: number;
  status: 'draft' | 'review' | 'published';
}

export default function AdminPdfPage() {
  const [pdfs, setPdfs] = useState<PdfMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const res = await fetch('/api/admin/materials', {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (!res.ok) throw new Error('Gagal memuat PDF');
      const json = await res.json();
      setPdfs(json.data.filter((m: any) => m.type === 'pdf'));
    } catch (err) {
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Hapus PDF "${title}"? Tindakan ini tidak bisa dibatalkan.`
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
      if (!res.ok) throw new Error('Gagal menghapus');
      setPdfs((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Gagal menghapus PDF. Coba lagi.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Kelola PDF"
        description="Semua dokumen PDF pembelajaran"
      >
        <Button className="gap-2" asChild>
          <Link href="/admin/upload">
            <Plus className="h-4 w-4" /> Upload PDF
          </Link>
        </Button>
      </PageHeader>

      {loading && (
        <div className="py-20 text-center text-muted-foreground">
          Memuat PDF...
        </div>
      )}

      {!loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfs.map((pdf) => {
            const fileUrl = pdf.chapters?.[0]?.pdfUrl;
            return (
              <Card key={pdf._id} variant="elevated">
                <CardContent className="pt-6">
                  {/* PDF preview */}
                  <div className="mb-4 flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed border-destructive/30 bg-destructive/5">
                    <div className="text-center">
                      <FilePdf className="mx-auto h-12 w-12 text-destructive" />
                      <p className="mt-2 text-xs text-muted-foreground">
                        {pdf.chapters?.length ?? 0} bagian
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex gap-1.5">
                      <Badge variant="secondary" size="sm">
                        {pdf.level}
                      </Badge>
                      <Badge
                        variant={
                          pdf.status === 'published'
                            ? 'success'
                            : pdf.status === 'review'
                              ? 'warning'
                              : 'secondary'
                        }
                        size="sm"
                      >
                        {pdf.status === 'published'
                          ? 'Publish'
                          : pdf.status === 'review'
                            ? 'Review'
                            : 'Draft'}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-medium">{pdf.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pdf.subject?.name ?? '-'}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{pdf.fileSize}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {pdf.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={!fileUrl}
                        asChild={!!fileUrl}
                      >
                        {fileUrl ? (
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon-sm" disabled>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive"
                        onClick={() => handleDelete(pdf._id, pdf.title)}
                        disabled={deletingId === pdf._id}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {pdfs.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              Belum ada PDF yang diupload.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
