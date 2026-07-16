import mongoose, { Schema, models, model } from 'mongoose';

const UserProgressSchema = new Schema(
  {
    userId: { type: String, required: true }, // Supabase auth user id
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    completed: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    percent: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserProgressSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

export default models.UserProgress || model('UserProgress', UserProgressSchema);
