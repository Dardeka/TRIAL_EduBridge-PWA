import {
  Users,
  BookOpen,
  Video,
  FileText,
  TrendingUp,
  Upload,
  Eye,
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

const adminStats = [
  { label: 'Total Siswa', value: '12,043', change: '+12%', icon: Users },
  { label: 'Total Materi', value: '524', change: '+8%', icon: BookOpen },
  { label: 'Video', value: '186', change: '+5%', icon: Video },
  { label: 'Dokumen PDF', value: '338', change: '+3%', icon: FileText },
];

const recentUploads = [
  { title: 'Aljabar Linear - Modul', type: 'PDF', date: '2 jam lalu', status: 'published' },
  { title: 'Sistem Pencernaan - Video', type: 'Video', date: '5 jam lalu', status: 'published' },
  { title: 'Tenses - Slide', type: 'PDF', date: '1 hari lalu', status: 'review' },
  { title: 'Proklamasi - Dokumen', type: 'PDF', date: '2 hari lalu', status: 'draft' },
];

const topMaterials = [
  { title: 'Matematika - Aljabar', views: 3200, percent: 92 },
  { title: 'Bahasa Inggris - Tenses', views: 2800, percent: 80 },
  { title: 'IPA - Sistem Pencernaan', views: 2100, percent: 60 },
  { title: 'Fisika - Rangkaian Listrik', views: 1900, percent: 54 },
  { title: 'Sejarah - Proklamasi', views: 1500, percent: 43 },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Kelola konten dan pantau statistik platform"
      >
        <Button className="gap-2" asChild>
          <Link href="/admin/upload">
            <Upload className="h-4 w-4" /> Upload Materi
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
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
                    <p className="mt-1 flex items-center gap-1 text-xs text-success">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change} bulan ini
                    </p>
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
            {recentUploads.map((item) => (
              <div
                key={item.title}
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
                <Progress
                  value={material.percent}
                  size="sm"
                  color="info"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
