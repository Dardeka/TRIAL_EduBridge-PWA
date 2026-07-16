'use client';

import { useState, useEffect } from 'react';
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
import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { AvatarSkeleton, ListSkeleton } from '@/components/ui/skeleton-presets';
import { ErrorBoundary } from '@/components/error-boundary';

interface Stat {
  label: string;
  value: number;
  total: number;
  color: 'default' | 'info' | 'success' | 'warning' | 'destructive';
}

interface AchievementItem {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface CertificateItem {
  title: string;
  date: string;
  score: number;
}

const EMPTY = {
  stats: [] as Stat[],
  achievements: [] as AchievementItem[],
  certificates: [] as CertificateItem[],
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfilePage() {
  const { user, isGuest } = useAuth();
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(!isGuest);

  useEffect(() => {
    if (isGuest || !user?.id) {
      setData(EMPTY);
      setLoading(false);
      return;
    }

    const userId = user.id;

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch(`/api/profile?userId=${userId}`);
        if (!res.ok) throw new Error('Gagal memuat profile');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setData(EMPTY);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user?.id, isGuest]);

  const { stats, achievements, certificates } = data;

  const userName = user?.fullName || 'Pengguna';
  const userEmail = user?.email || '-';
  const initials = getInitials(userName);
  const userLevel = user?.educationLevel || 'SMA';
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })
    : '-';

  if (loading) {
    return (
      <div className="space-y-6">
        <AvatarSkeleton />
        <ListSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Kelola informasi akun dan pencapaian"
      >
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/profile/edit">
            <Edit className="h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </PageHeader>

      {isGuest && (
        <p className="mb-4 text-sm text-muted-foreground">
          Profile dan pencapaian tidak tersedia dalam mode tamu.
        </p>
      )}

      {/* User card */}
      <ErrorBoundary>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-heading text-xl font-bold">{userName}</h2>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="secondary">{userLevel}</Badge>
                  <Badge variant="info">Bergabung {joinedDate}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistik Belajar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="font-medium">
                        {stat.value}/{stat.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        stat.total > 0 ? (stat.value / stat.total) * 100 : 0
                      }
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
                {certificates.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Belum ada sertifikat.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
