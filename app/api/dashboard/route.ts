import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sanitizeSearchParam } from '@/lib/sanitize';
import UserStats from '@/models/UserStats';
import MaterialProgress from '@/models/MaterialProgress';
import Subject from '@/models/Subject';
import DailyTask from '@/models/DailyTask';
import Material from '@/models/Material';
import Achievement from '@/models/Achievement';
import Certificate from '@/models/Certificate';

export const dynamic = 'force-dynamic';

// Preset tailwind color combos — cycled by index, not derived from hex,
// so it always renders using existing design tokens (dark mode safe).
const COLOR_PALETTE = [
  'bg-primary/10 text-primary',
  'bg-accent/15 text-accent-foreground',
  'bg-success/15 text-success',
  'bg-info/15 text-info',
  'bg-warning/15 text-warning',
  'bg-destructive/15 text-destructive',
];

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = sanitizeSearchParam(searchParams.get('userId'));
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [
      statsDoc,
      continueLearningDocs,
      subjectDocs,
      dailyTaskDocs,
      recommendationDocs,
      achievementDocs,
      materiSelesai,
      sedangBerjalan,
      sertifikat,
      userXpDoc,
      totalUsersWithXp,
    ] = await Promise.all([
      UserStats.findOne({ userId }),
      MaterialProgress.find({ userId, percent: { $gt: 0, $lt: 100 } })
        .sort({ lastAccessedAt: -1 })
        .limit(3)
        .populate({
          path: 'materialId',
          populate: { path: 'subject', select: 'name' },
        }),
      Subject.aggregate([
        {
          $lookup: {
            from: 'materials',
            localField: '_id',
            foreignField: 'subject',
            as: 'materials',
          },
        },
        { $addFields: { lessons: { $size: '$materials' } } },
        { $project: { materials: 0 } },
        { $sort: { name: 1 } },
        { $limit: 8 },
      ]),
      DailyTask.find({
        userId,
        date: { $gte: startOfToday, $lte: endOfToday },
      }),
      Material.find()
        .sort({ students: -1 })
        .limit(3)
        .populate('subject', 'name'),
      Achievement.find().sort({ createdAt: 1 }).limit(4),
      MaterialProgress.countDocuments({ userId, percent: 100 }),
      MaterialProgress.countDocuments({
        userId,
        percent: { $gt: 0, $lt: 100 },
      }),
      Certificate.countDocuments({ userId }),
      UserStats.findOne({ userId }).select('xp').lean(),
      UserStats.countDocuments({ xp: { $gt: 0 } }),
    ]);

    const stats = statsDoc || {
      xp: 0,
      xpToNextLevel: 3000,
      level: 1,
      streak: 0,
      totalMinutesLearned: 0,
    };

    const usersAbove = userXpDoc
      ? await UserStats.countDocuments({ xp: { $gt: userXpDoc.xp } })
      : totalUsersWithXp;
    const ranking = totalUsersWithXp > 0 ? usersAbove + 1 : null;

    const continueLearning = continueLearningDocs
      .filter((p: any) => p.materialId)
      .map((p: any) => ({
        id: p.materialId._id.toString(),
        title: p.materialId.title,
        subject: p.materialId.subject?.name ?? '-',
        level: p.materialId.level,
        progress: p.percent,
        icon: p.materialId.icon,
        duration: `${p.materialId.duration} tersisa`,
      }));

    const subjects = subjectDocs.map((s: any, i: number) => ({
      title: s.name,
      icon: s.icon,
      color: COLOR_PALETTE[i % COLOR_PALETTE.length],
      href: '/mapel',
      lessons: s.lessons,
    }));

    const dailyTasks = dailyTaskDocs.map((t: any) => ({
      id: t._id.toString(),
      title: t.title,
      xp: t.xpReward,
      done: t.completed,
      type: 'task',
    }));

    const recommendations = recommendationDocs.map((m: any) => ({
      id: m._id.toString(),
      title: m.title,
      subject: m.subject?.name ?? '-',
      level: m.level,
      duration: m.duration,
      rating: m.rating,
      students: m.students,
      icon: m.icon,
      tag: m.students > 300 ? 'Populer' : 'Rekomendasi',
    }));

    const achievements = achievementDocs.map((a: any) => ({
      title: a.title,
      icon: a.icon,
      earned: (a.earnedBy || []).includes(userId),
    }));

    return NextResponse.json({
      data: {
        stats: {
          xp: stats.xp,
          xpToNextLevel: stats.xpToNextLevel,
          level: stats.level,
          streak: stats.streak,
        },
        quickStats: {
          materiSelesai,
          sedangBerjalan,
          sertifikat,
          jamBelajar: Math.round((stats.totalMinutesLearned || 0) / 60),
        },
        ranking,
        continueLearning,
        subjects,
        dailyTasks,
        recommendations,
        achievements,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
