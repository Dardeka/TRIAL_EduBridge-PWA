import mongoose, { Schema, models, model } from 'mongoose';

const DailyTaskSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }, // task assigned for this day
    xpReward: { type: Number, default: 10 },
  },
  { timestamps: true }
);

DailyTaskSchema.index({ userId: 1, date: 1 });

export default models.DailyTask || model('DailyTask', DailyTaskSchema);
