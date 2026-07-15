import { Download, FileText, Video, Clock } from 'lucide-react';
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

const downloads = [
  { title: 'Aljabar Linear - Modul', type: 'pdf', size: '2.4 MB', date: '15 Jun 2025', subject: 'Matematika' },
  { title: 'Sistem Pencernaan - Slide', type: 'pdf', size: '5.1 MB', date: '10 Jun 2025', subject: 'IPA' },
  { title: 'Tenses - Video Pembelajaran', type: 'video', size: '124 MB', date: '8 Jun 2025', subject: 'Bahasa Inggris' },
  { title: 'Proklamasi Kemerdekaan - Dokumen', type: 'pdf', size: '1.8 MB', date: '5 Jun 2025', subject: 'Sejarah' },
  { title: 'Pemrograman Dasar - Modul', type: 'pdf', size: '3.2 MB', date: '1 Jun 2025', subject: 'Informatika' },
  { title: 'Rangkaian Listrik - Video', type: 'video', size: '98 MB', date: '28 May 2025', subject: 'Fisika' },
];

export default function DownloadsPage() {
  return (
    <div>
      <PageHeader
        title="Downloads"
        description="Materi yang telah Anda unduh"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {downloads.map((item) => (
          <Card key={item.title} variant="elevated">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  {item.type === 'video' ? (
                    <Video className="h-6 w-6 text-info" />
                  ) : (
                    <FileText className="h-6 w-6 text-destructive" />
                  )}
                </div>
                <Badge variant={item.type === 'video' ? 'info' : 'accent'} size="sm">
                  {item.type === 'video' ? 'Video' : 'PDF'}
                </Badge>
              </div>
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardDescription>{item.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{item.size}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <Button variant="outline" size="icon-sm">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
