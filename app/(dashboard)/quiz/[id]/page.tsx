'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Award } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/auth-provider';
import { supabase } from '@/lib/supabase';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  _id: string;
  title: string;
  passingScore: number;
  questions: Question[];
  materialId: {
    _id: string;
    title: string;
    level: string;
    subject: { name: string } | null;
  };
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, isGuest } = useAuth();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [serverResult, setServerResult] = useState<{
    score: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);
        const res = await fetch(`/api/quizzes/${id}`);
        if (res.status === 404) {
          setNotFoundError(true);
          return;
        }
        if (!res.ok) throw new Error('Gagal memuat kuis');
        const json = await res.json();
        setQuizData(json.data);
      } catch (err) {
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Memuat kuis...
      </div>
    );
  }

  if (notFoundError || !quizData) {
    return (
      <div>
        <Link
          href="/materi"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
        </Link>
        <div className="py-20 text-center text-muted-foreground">
          Kuis untuk materi ini belum tersedia.
        </div>
      </div>
    );
  }

  const total = quizData.questions.length;
  const progress = ((current + 1) / total) * 100;

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (current + 1 < total) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);

      if (!isGuest && user?.id) {
        try {
          setSubmitting(true);
          const {
            data: { session },
          } = await supabase.auth.getSession();
          const res = await fetch('/api/quiz-submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(session?.access_token
                ? { Authorization: `Bearer ${session.access_token}` }
                : {}),
            },
            body: JSON.stringify({
              materialId: quizData.materialId._id,
              quizTitle: quizData.title,
              answers: newAnswers,
            }),
          });
          if (res.ok) {
            const json = await res.json();
            setXpEarned(json.data.xpEarned);
            setServerResult({
              score: json.data.score,
              percentage: json.data.percentage,
              passed: json.data.passed,
            });
          }
        } catch {
        } finally {
          setSubmitting(false);
        }
      }
    }
  };

  if (finished) {
    const score =
      serverResult?.score ??
      answers.filter((a, i) => a === quizData.questions[i].correctAnswer)
        .length;
    const percentage =
      serverResult?.percentage ?? Math.round((score / total) * 100);
    const passed =
      serverResult?.passed ?? percentage >= (quizData.passingScore || 70);

    return (
      <div>
        <Link
          href="/materi"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
        </Link>

        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div
              className={cn(
                'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full',
                passed
                  ? 'bg-success/10 text-success'
                  : 'bg-warning/10 text-warning'
              )}
            >
              {passed ? (
                <Award className="h-10 w-10" />
              ) : (
                <Clock className="h-10 w-10" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Selamat! Kuis Selesai' : 'Coba Lagi'}
            </CardTitle>
            <CardDescription>
              {passed
                ? 'Anda lulus kuis ini. Sertifikat siap diunduh.'
                : 'Anda belum lulus. Pelajari kembali materinya.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-6 text-center">
              <p className="text-sm text-muted-foreground">Skor Anda</p>
              <p className="mt-2 font-heading text-4xl font-bold text-primary">
                {percentage}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {score} dari {total} jawaban benar
              </p>
              {!isGuest && xpEarned > 0 && (
                <p className="mt-2 text-sm font-medium text-accent-foreground">
                  +{xpEarned} XP didapat
                </p>
              )}
              {isGuest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Progress tidak disimpan karena mode tamu
                </p>
              )}
            </div>
            <Progress
              value={percentage}
              color={passed ? 'success' : 'warning'}
              size="lg"
            />
          </CardContent>
          <CardFooter className="justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setAnswers([]);
                setFinished(false);
                setXpEarned(0);
                setServerResult(null);
              }}
            >
              Ulangi Kuis
            </Button>
            <Link href="/dashboard">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question = quizData.questions[current];

  return (
    <div>
      <Link
        href="/materi"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
      </Link>

      <PageHeader
        title={quizData.title}
        description={`${quizData.materialId.subject?.name ?? '-'} - ${quizData.materialId.level}`}
      />

      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">
              Soal {current + 1} dari {total}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} size="sm" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors',
                  selected === i
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted/30'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    selected === i
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border'
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </button>
            ))}
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              onClick={handleNext}
              disabled={selected === null || submitting}
              className="gap-2"
            >
              {submitting
                ? 'Menyimpan...'
                : current + 1 < total
                  ? 'Selanjutnya'
                  : 'Selesai'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
