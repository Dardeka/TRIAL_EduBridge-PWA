import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sanitizeSearchParam } from '@/lib/sanitize';
import UserStats from '@/models/UserStats';
import MaterialProgress from '@/models/MaterialProgress';
import Material from '@/models/Material';
import Quiz from '@/models/Quiz';
import Certificate from '@/models/Certificate';

export const dynamic = 'force-dynamic';

const DAY_ORDER = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const SUBJECT_COLORS = [
  'default',
  'info',
  'success',
  'warning',
  'destructive',
] as const;

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = sanitizeSearchParam(searchParams.get('userId'));
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const [
      statsDoc,
      totalMaterials,
      totalQuizzes,
      materiSelesai,
      kuisLulus,
      materialsBySubject,
      completedProgress,
    ] = await Promise.all([
      UserStats.findOne({ userId }),
      Material.countDocuments(),
      Quiz.countDocuments(),
      MaterialProgress.countDocuments({ userId, percent: 100 }),
      Certificate.countDocuments({ userId }),
      Material.aggregate([
        {
          $lookup: {
            from: 'subjects',
            localField: 'subject',
            foreignField: '_id',
            as: 'subjectInfo',
          },
        },
        { $unwind: '$subjectInfo' },
        {
          $group: {
            _id: '$subjectInfo.name',
            total: { $sum: 1 },
            materialIds: { $push: '$_id' },
          },
        },
      ]),
      MaterialProgress.find({ userId, percent: 100 }).select('materialId'),
    ]);

    const stats = statsDoc || {
      totalMinutesLearned: 0,
      quizScoreSum: 0,
      quizAttempts: 0,
      weeklyActivity: [],
    };

    const completedIds = new Set(
      completedProgress.map((p: any) => p.materialId.toString())
    );

    const subjectProgress = materialsBySubject.map((s: any, i: number) => {
      const completed = s.materialIds.filter((id: any) =>
        completedIds.has(id.toString())
      ).length;
      return {
        subject: s._id,
        completed,
        total: s.total,
        percent: s.total > 0 ? Math.round((completed / s.total) * 100) : 0,
        color: SUBJECT_COLORS[i % SUBJECT_COLORS.length],
      };
    });

    const avgScore =
      stats.quizAttempts > 0
        ? Math.round(stats.quizScoreSum / stats.quizAttempts)
        : 0;
    const jamBelajar = Math.round((stats.totalMinutesLearned || 0) / 60);
    const jamBelajarTarget = 200; // target tetap, bukan dihitung dari data

    const overallStats = [
      {
        key: 'materi',
        label: 'Materi Selesai',
        value: materiSelesai,
        total: totalMaterials,
        percent:
          totalMaterials > 0
            ? Math.round((materiSelesai / totalMaterials) * 100)
            : 0,
        color: 'success',
      },
      {
        key: 'kuis',
        label: 'Kuis Lulus',
        value: kuisLulus,
        total: totalQuizzes,
        percent:
          totalQuizzes > 0 ? Math.round((kuisLulus / totalQuizzes) * 100) : 0,
        color: 'info',
      },
      {
        key: 'jam',
        label: 'Jam Belajar',
        value: jamBelajar,
        total: jamBelajarTarget,
        percent: Math.min(
          100,
          Math.round((jamBelajar / jamBelajarTarget) * 100)
        ),
        color: 'warning',
      },
      {
        key: 'skor',
        label: 'Rata-rata Skor',
        value: avgScore,
        total: 100,
        percent: avgScore,
        color: 'default',
      },
    ];

    const activityMap = new Map(
      (stats.weeklyActivity || []).map((d: any) => [d.day, d.minutes])
    );
    const weeklyActivity = DAY_ORDER.map((day) => ({
      day,
      hours:
        Math.round((((activityMap.get(day) as number) || 0) / 60) * 10) / 10,
    }));

    return NextResponse.json({
      data: { overallStats, subjectProgress, weeklyActivity },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
