'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  Video,
  FileText,
  TrendingUp,
  Upload,
  Eye,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/lib/supabase';

const ICON_MAP: Record<string, any> = {
  'Total Siswa': Users,
  'Total Materi': BookOpen,
  Video: Video,
  'Dokumen PDF': FileText,
};

interface AdminStat {
  label: string;
  value: string;
  change: string | null;
}

interface RecentUpload {
  title: string;
  type: string;
  date: string;
  status: 'draft' | 'review' | 'published';
}

interface TopMaterial {
  title: string;
  views: number;
  percent: number;
}

const EMPTY = {
  adminStats: [] as AdminStat[],
  recentUploads: [] as RecentUpload[],
  topMaterials: [] as TopMaterial[],
};

export default function AdminDashboardPage() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminDashboard() {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const res = await fetch('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${session?.access_token}` },
        });
        if (!res.ok) throw new Error('Gagal memuat admin dashboard');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setData(EMPTY);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminDashboard();
  }, []);

  const { adminStats, recentUploads, topMaterials } = data;

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Memuat admin dashboard...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Kelola konten dan pantau statistik platform"
      >
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/dashboard">
              <GraduationCap className="h-4 w-4" /> Lihat sebagai Siswa
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link href="/admin/upload">
              <Upload className="h-4 w-4" /> Upload Materi
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = ICON_MAP[stat.label] ?? BookOpen;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold">
                      {stat.value}
                    </p>
                    {stat.change && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-success">
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </p>
                    )}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recent uploads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upload Terbaru</CardTitle>
              <Link
                href="/admin/materi"
                className="text-sm text-primary hover:underline"
              >
                Lihat semua
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUploads.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  {item.type === 'Video' ? (
                    <Video className="h-5 w-5 text-info" />
                  ) : (
                    <FileText className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.type} - {item.date}
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === 'published'
                      ? 'success'
                      : item.status === 'review'
                        ? 'warning'
                        : 'secondary'
                  }
                  size="sm"
                >
                  {item.status === 'published'
                    ? 'Publish'
                    : item.status === 'review'
                      ? 'Review'
                      : 'Draft'}
                </Badge>
              </div>
            ))}
            {recentUploads.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada upload.</p>
            )}
          </CardContent>
        </Card>

        {/* Top materials */}
        <Card>
          <CardHeader>
            <CardTitle>Materi Terpopuler</CardTitle>
            <CardDescription>Berdasarkan jumlah views</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topMaterials.map((material) => (
              <div key={material.title}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">{material.title}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    {material.views.toLocaleString()}
                  </span>
                </div>
                <Progress value={material.percent} size="sm" color="info" />
              </div>
            ))}
            {topMaterials.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Belum ada data views.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
