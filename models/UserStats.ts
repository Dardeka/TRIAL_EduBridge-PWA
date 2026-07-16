import mongoose, { Schema, models, model } from 'mongoose';

const WeeklyActivitySchema = new Schema(
  {
    day: { type: String, required: true },
    minutes: { type: Number, default: 0 },
  },
  { _id: false }
);

const UserStatsSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    xp: { type: Number, default: 0 },
    xpToNextLevel: { type: Number, default: 3000 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    totalMinutesLearned: { type: Number, default: 0 },
    quizScoreSum: { type: Number, default: 0 },
    quizAttempts: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    weeklyActivity: [WeeklyActivitySchema],
  },
  { timestamps: true }
);

export default models.UserStats || model('UserStats', UserStatsSchema);
