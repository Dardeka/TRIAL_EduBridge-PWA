import { TrendingUp, Clock, Award, Target } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const overallStats = [
  { label: 'Materi Selesai', value: '24', total: '50', percent: 48, icon: Target, color: 'success' as const },
  { label: 'Kuis Lulus', value: '18', total: '25', percent: 72, icon: Award, color: 'info' as const },
  { label: 'Jam Belajar', value: '127', total: '200', percent: 64, icon: Clock, color: 'warning' as const },
  { label: 'Rata-rata Skor', value: '87', total: '100', percent: 87, icon: TrendingUp, color: 'default' as const },
];

const subjectProgress = [
  { subject: 'Matematika', completed: 12, total: 20, percent: 60, color: 'default' as const },
  { subject: 'Bahasa Inggris', completed: 8, total: 15, percent: 53, color: 'info' as const },
  { subject: 'IPA', completed: 6, total: 10, percent: 60, color: 'success' as const },
  { subject: 'Sejarah', completed: 4, total: 8, percent: 50, color: 'warning' as const },
  { subject: 'Fisika', completed: 3, total: 7, percent: 43, color: 'destructive' as const },
];

const weeklyActivity = [
  { day: 'Sen', hours: 2.5 },
  { day: 'Sel', hours: 3.0 },
  { day: 'Rab', hours: 1.5 },
  { day: 'Kam', hours: 4.0 },
  { day: 'Jum', hours: 2.0 },
  { day: 'Sab', hours: 3.5 },
  { day: 'Min', hours: 1.0 },
];

export default function ProgressPage() {
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <div>
      <PageHeader
        title="Progress Belajar"
        description="Pantau perkembangan belajar Anda"
      />

      {/* Overall stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overallStats.map((stat) => {
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
                      <span className="text-base text-muted-foreground">
                        {' '}
                        / {stat.total}
                      </span>
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <Progress
                  value={stat.percent}
                  color={stat.color}
                  size="sm"
                  className="mt-4"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Subject progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress per Mata Pelajaran</CardTitle>
            <CardDescription>
              Selesaikan materi untuk mencapai target
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectProgress.map((subject) => (
              <div key={subject.subject}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-muted-foreground">
                    {subject.completed}/{subject.total} materi
                  </span>
                </div>
                <Progress
                  value={subject.percent}
                  color={subject.color}
                  size="sm"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly activity chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Mingguan</CardTitle>
            <CardDescription>Jam belajar per hari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {weeklyActivity.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                      style={{
                        height: `${(day.hours / maxHours) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {day.day}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {day.hours}j
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
