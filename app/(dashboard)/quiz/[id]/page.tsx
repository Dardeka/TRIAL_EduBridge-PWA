'use client';

import { useState } from 'react';
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

const quizData = {
  title: 'Kuis: Aljabar Linear',
  subject: 'Matematika',
  level: 'SMA',
  totalQuestions: 5,
  questions: [
    {
      question: 'Berapa hasil dari 2x + 3 = 7?',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
      answer: 1,
    },
    {
      question: 'Metode eliminasi digunakan untuk?',
      options: [
        'Mencari akar persamaan',
        'Menghilangkan satu variabel',
        'Menggambar grafik',
        'Mencari nilai maksimum',
      ],
      answer: 1,
    },
    {
      question: 'Sistem persamaan 2x + y = 5 dan x - y = 1, nilai x =?',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
      answer: 1,
    },
    {
      question: 'Jika 3x - 6 = 0, maka x =?',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 0'],
      answer: 1,
    },
    {
      question: 'Garis y = 2x + 3 memotong sumbu y di titik?',
      options: ['(0, 2)', '(0, 3)', '(3, 0)', '(2, 0)'],
      answer: 1,
    },
  ],
};

export default function QuizPage({
  params,
}: {
  params: { id: string };
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const total = quizData.questions.length;
  const progress = ((current + 1) / total) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (current + 1 < total) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const score = answers.filter(
      (a, i) => a === quizData.questions[i].answer
    ).length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

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
                passed ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
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
        description={`${quizData.subject} - ${quizData.level}`}
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
              disabled={selected === null}
              className="gap-2"
            >
              {current + 1 < total ? 'Selanjutnya' : 'Selesai'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
