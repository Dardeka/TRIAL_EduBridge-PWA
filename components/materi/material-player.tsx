'use client';

import { useState } from 'react';
import { Play, FileText, CheckCircle2, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Chapter {
  _id: string;
  title: string;
  duration: string;
  done: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

export function MaterialPlayer({
  chapters,
  type,
}: {
  chapters: Chapter[];
  type: 'video' | 'pdf' | 'text';
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = chapters[selectedIndex];

  return (
    <>
      {/* Preview area */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted">
            {type === 'video' && current?.videoUrl ? (
              <video
                key={current._id}
                controls
                className="h-full w-full rounded-lg"
                src={current.videoUrl}
              >
                Browser kamu tidak mendukung pemutaran video.
              </video>
            ) : type === 'pdf' && current?.pdfUrl ? (
              <iframe
                key={current._id}
                src={current.pdfUrl}
                className="h-full w-full rounded-lg"
              />
            ) : (
              <div className="text-center">
                {type === 'video' ? (
                  <Play className="mx-auto h-12 w-12 text-muted-foreground" />
                ) : (
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Belum ada file untuk bab ini
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chapters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Daftar Bab
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {chapters.map((chapter, i) => (
            <button
              key={chapter._id}
              onClick={() => setSelectedIndex(i)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/30 ${
                i === selectedIndex ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {chapter.done ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  i + 1
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${chapter.done ? 'text-muted-foreground line-through' : ''}`}
                >
                  {chapter.title}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {chapter.duration}
              </span>
            </button>
          ))}
          {chapters.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Belum ada bab untuk materi ini.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
