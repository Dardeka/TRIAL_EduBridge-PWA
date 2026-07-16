import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/require-auth';
import MaterialProgress from '@/models/MaterialProgress';
import UserStats from '@/models/UserStats';
import Certificate from '@/models/Certificate';
import Material from '@/models/Material';
import Quiz from '@/models/Quiz';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.message },
        { status: auth.status }
      );
    }
    const userId = auth.userId;

    await connectToDatabase();
    const body = await req.json();
    const { materialId, quizTitle, answers } = body;

    if (
      typeof materialId !== 'string' ||
      !materialId.trim() ||
      typeof quizTitle !== 'string' ||
      !quizTitle.trim() ||
      !Array.isArray(answers)
    ) {
      return NextResponse.json(
        { error: 'materialId, quizTitle, and answers[] are required' },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findOne({ materialId });
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    if (answers.length !== quiz.questions.length) {
      return NextResponse.json(
        { error: 'Answers length must match questions length' },
        { status: 400 }
      );
    }

    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answers[i] === quiz.questions[i].correctAnswer) {
        score++;
      }
    }
    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= (quiz.passingScore || 70);

    await MaterialProgress.findOneAndUpdate(
      { userId, materialId },
      { $set: { percent: 100, lastAccessedAt: new Date() } },
      { upsert: true }
    );

    const xpReward = passed ? 50 : 10;
    const stats = await UserStats.findOneAndUpdate(
      { userId },
      { $inc: { xp: xpReward, quizScoreSum: percentage, quizAttempts: 1 } },
      { upsert: true, new: true }
    );

    let certificateCreated = false;
    if (passed) {
      const material = await Material.findById(materialId).select('subject');
      const existing = await Certificate.findOne({ userId, title: quizTitle });
      if (!existing) {
        try {
          await Certificate.create({
            userId,
            subjectId: material?.subject,
            title: quizTitle,
            score: percentage,
          });
          certificateCreated = true;
        } catch {
          // Duplicate key — certificate already exists (race condition)
        }
      }
    }

    return NextResponse.json({
      data: {
        xpEarned: xpReward,
        totalXp: stats.xp,
        certificateCreated,
        score,
        percentage,
        passed,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
