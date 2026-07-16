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
import { connectToDatabase } from '@/lib/mongodb';
import Subject from '@/models/Subject';

interface SubjectData {
  _id: string;
  name: string;
  icon: string;
  count: number;
  levels: string[];
}

async function getSubjects(): Promise<SubjectData[]> {
  try {
    await connectToDatabase();
    const subjects = await Subject.aggregate([
      {
        $lookup: {
          from: 'materials',
          localField: '_id',
          foreignField: 'subject',
          as: 'materials',
        },
      },
      {
        $addFields: {
          count: { $size: '$materials' },
          levels: { $setUnion: ['$materials.level', []] },
        },
      },
      { $project: { materials: 0 } },
      { $sort: { name: 1 } },
    ]);

    return subjects.map((s) => ({
      _id: s._id.toString(),
      name: s.name,
      icon: s.icon,
      count: s.count,
      levels: s.levels,
    }));
  } catch (err) {
    return [];
  }
}

export const metadata = {
  title: 'Mata Pelajaran',
  description: 'Jelajahi semua mata pelajaran yang tersedia di EduBridge',
};

export default async function MapelPage() {
  const subjects = await getSubjects();

  return (
    <div>
      <PageHeader
        title="Mata Pelajaran"
        description="Jelajahi semua mata pelajaran yang tersedia"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject._id} href={`/materi?subject=${subject._id}`}>
            <Card variant="elevated" className="group h-full cursor-pointer">
              <CardHeader>
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">
                  {subject.icon}
                </div>
                <CardTitle>{subject.name}</CardTitle>
                <CardDescription>
                  {subject.count} materi tersedia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {subject.levels.map((level) => (
                      <Badge key={level} variant="secondary" size="sm">
                        {level}
                      </Badge>
                    ))}
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          Belum ada mata pelajaran yang tersedia
        </div>
      )}
    </div>
  );
}
