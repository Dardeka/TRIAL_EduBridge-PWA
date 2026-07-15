'use client';

import { Award, BookOpen, Star, Edit, Download } from 'lucide-react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const userInfo = {
  name: 'Budi Santoso',
  email: 'budi@email.com',
  initials: 'BS',
  level: 'SMA',
  joinedDate: 'Januari 2025',
};

const achievements = [
  { title: 'First Steps', description: 'Selesaikan materi pertama', icon: '🎯', earned: true },
  { title: 'Quiz Master', description: 'Lulus 10 kuis', icon: '🧠', earned: true },
  { title: 'Consistent', description: 'Belajar 7 hari berturut', icon: '🔥', earned: true },
  { title: 'Bookworm', description: 'Selesaikan 25 materi', icon: '📚', earned: false },
  { title: 'Perfect Score', description: '100% di 5 kuis', icon: '💯', earned: false },
  { title: 'Marathon', description: 'Belajar 30 hari berturut', icon: '🏃', earned: false },
];

const certificates = [
  { title: 'Matematika - Aljabar', date: '15 Jun 2025', score: 92 },
  { title: 'Bahasa Inggris - Tenses', date: '10 Jun 2025', score: 88 },
  { title: 'IPA - Sistem Pencernaan', date: '5 Jun 2025', score: 95 },
];

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" description="Kelola informasi akun dan pencapaian">
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      </PageHeader>

      {/* User card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
                {userInfo.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-xl font-bold">
                {userInfo.name}
              </h2>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="secondary">{userInfo.level}</Badge>
                <Badge variant="info">Bergabung {userInfo.joinedDate}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Statistik Belajar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Materi Selesai', value: 24, total: 50, color: 'success' as const },
                { label: 'Kuis Lulus', value: 18, total: 25, color: 'info' as const },
                { label: 'Jam Belajar', value: 127, total: 200, color: 'warning' as const },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-medium">
                      {stat.value}/{stat.total}
                    </span>
                  </div>
                  <Progress
                    value={(stat.value / stat.total) * 100}
                    color={stat.color}
                    size="sm"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Pencapaian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {achievements.map((a) => (
                  <div
                    key={a.title}
                    className={`rounded-lg border p-4 text-center ${a.earned ? 'border-primary/30 bg-primary/5' : 'opacity-50'}`}
                  >
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                      {a.icon}
                    </div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {a.description}
                    </p>
                    {a.earned && (
                      <Badge variant="success" size="sm" className="mt-2">
                        <Star className="h-3 w-3" /> Didapat
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Sertifikat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.date} - Skor: {cert.score}%
                    </p>
                  </div>
                  <Button variant="outline" size="icon-sm">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
