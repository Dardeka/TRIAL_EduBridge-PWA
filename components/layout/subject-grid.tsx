import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface SubjectGridProps {
  level: string;
  levelDescription: string;
  subjects: {
    id: string;
    title: string;
    icon: string;
    count: number;
    color: string;
  }[];
}

export function SubjectGrid({
  level,
  levelDescription,
  subjects,
}: SubjectGridProps) {
  return (
    <div>
      <PageHeader title={`Kelas ${level}`} description={levelDescription} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/materi?subject=${subject.id}`}>
            <Card variant="elevated" className="group h-full cursor-pointer">
              <CardHeader>
                <div
                  className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl ${subject.color} text-2xl`}
                >
                  {subject.icon}
                </div>
                <CardTitle>{subject.title}</CardTitle>
                <CardDescription>
                  {subject.count} materi tersedia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {subject.count} materi
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
