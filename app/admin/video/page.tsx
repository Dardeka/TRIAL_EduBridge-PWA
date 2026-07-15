import { Video, Play, Clock, Eye, Plus, Edit, Trash2 } from 'lucide-react';
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

const videos = [
  { title: 'Aljabar Linear - Sistem Persamaan', subject: 'Matematika', level: 'SMA', duration: '45:00', views: 3200, status: 'published' },
  { title: 'Sistem Pencernaan Manusia', subject: 'IPA', level: 'SD', duration: '20:00', views: 2100, status: 'published' },
  { title: 'Tenses in English Grammar', subject: 'Bahasa Inggris', level: 'SMP', duration: '30:00', views: 2800, status: 'published' },
  { title: 'Pengenalan Pemrograman', subject: 'Informatika', level: 'SMP', duration: '60:00', views: 3800, status: 'published' },
  { title: 'Rangkaian Listrik Dasar', subject: 'Fisika', level: 'SMA', duration: '40:00', views: 0, status: 'draft' },
  { title: 'Persamaan Kuadrat', subject: 'Matematika', level: 'SMP', duration: '35:00', views: 4100, status: 'published' },
];

export default function AdminVideoPage() {
  return (
    <div>
      <PageHeader
        title="Kelola Video"
        description="Semua video pembelajaran"
      >
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Upload Video
        </Button>
      </PageHeader>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.title} variant="elevated">
            <CardContent className="pt-6">
              {/* Thumbnail */}
              <div className="relative mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted">
                <Play className="h-10 w-10 text-muted-foreground" />
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  {video.duration}
                </span>
              </div>

              <div className="mb-2 flex items-start justify-between">
                <div className="flex gap-1.5">
                  <Badge variant="secondary" size="sm">
                    {video.level}
                  </Badge>
                  <Badge
                    variant={
                      video.status === 'published' ? 'success' : 'secondary'
                    }
                    size="sm"
                  >
                    {video.status === 'published' ? 'Publish' : 'Draft'}
                  </Badge>
                </div>
              </div>

              <h3 className="font-medium">{video.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {video.subject}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {video.views.toLocaleString()} views
                </span>
                <div className="flex gap-1">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
