import mongoose, { Schema, models, model } from 'mongoose';

const AchievementSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'trophy' },
    xpReward: { type: Number, default: 0 },
    earnedBy: [{ type: String }],
  },
  { timestamps: true }
);

export default models.Achievement || model('Achievement', AchievementSchema);
