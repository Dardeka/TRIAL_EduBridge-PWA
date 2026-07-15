'use client';

import { useState } from 'react';
import { UploadCloud, FileText, Video, X, Check } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, InputWithIcon } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const fileTypes = [
  { id: 'pdf', label: 'PDF Document', icon: FileText, accept: '.pdf' },
  { id: 'video', label: 'Video', icon: Video, accept: 'video/*' },
];

export default function AdminUploadPage() {
  const [fileType, setFileType] = useState('pdf');
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    setFiles([...files, ...dropped]);
  };

  return (
    <div>
      <PageHeader
        title="Upload Materi"
        description="Unggah materi pembelajaran baru"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload form */}
        <div className="lg:col-span-2 space-y-6">
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
                      onClick={() => setFileType(type.id)}
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
                      <span className="text-sm font-medium">
                        {type.label}
                      </span>
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
                      accept={
                        fileTypes.find((t) => t.id === fileType)?.accept
                      }
                      onChange={(e) => {
                        if (e.target.files) {
                          const newFiles = Array.from(e.target.files).map(
                            (f) => ({
                              name: f.name,
                              size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
                            })
                          );
                          setFiles([...files, ...newFiles]);
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

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      {fileType === 'pdf' ? (
                        <FileText className="h-5 w-5 text-destructive" />
                      ) : (
                        <Video className="h-5 w-5 text-info" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size}
                        </p>
                      </div>
                      <Badge variant="success" size="sm">
                        <Check className="h-3 w-3" /> Siap
                      </Badge>
                      <button
                        onClick={() =>
                          setFiles(files.filter((_, j) => j !== i))
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
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
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Materi</Label>
                  <Input
                    id="title"
                    placeholder="Contoh: Aljabar Linear - Sistem Persamaan"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Mata Pelajaran</Label>
                    <Input id="subject" placeholder="Matematika" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Jenjang</Label>
                    <Input id="level" placeholder="SMA" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi singkat tentang materi..."
                  />
                </div>
                <Button type="submit" className="gap-2">
                  <UploadCloud className="h-4 w-4" /> Upload Materi
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
