import { FileText as FilePdf, Download, Eye, Plus, Edit, Trash2 } from 'lucide-react';
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

const pdfs = [
  { title: 'Aljabar Linear - Modul', subject: 'Matematika', level: 'SMA', size: '2.4 MB', pages: 24, views: 3200, status: 'published' },
  { title: 'Sistem Pencernaan - Slide', subject: 'IPA', level: 'SD', size: '5.1 MB', pages: 18, views: 2100, status: 'published' },
  { title: 'Proklamasi Kemerdekaan', subject: 'Sejarah', level: 'SMA', size: '1.8 MB', pages: 12, views: 1500, status: 'review' },
  { title: 'Pemrograman Dasar - Modul', subject: 'Informatika', level: 'SMP', size: '3.2 MB', pages: 30, views: 3800, status: 'published' },
  { title: 'Tata Surya dan Planet', subject: 'IPA', level: 'SD', size: '4.0 MB', pages: 16, views: 1800, status: 'published' },
  { title: 'Ekosistem dan Keseimbangan', subject: 'Biologi', level: 'SMA', size: '2.8 MB', pages: 20, views: 2600, status: 'draft' },
];

export default function AdminPdfPage() {
  return (
    <div>
      <PageHeader
        title="Kelola PDF"
        description="Semua dokumen PDF pembelajaran"
      >
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Upload PDF
        </Button>
      </PageHeader>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pdfs.map((pdf) => (
          <Card key={pdf.title} variant="elevated">
            <CardContent className="pt-6">
              {/* PDF preview */}
              <div className="mb-4 flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed border-destructive/30 bg-destructive/5">
                <div className="text-center">
                  <FilePdf className="mx-auto h-12 w-12 text-destructive" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {pdf.pages} halaman
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
                {pdf.subject}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{pdf.size}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {pdf.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm">
                    <Download className="h-3.5 w-3.5" />
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
