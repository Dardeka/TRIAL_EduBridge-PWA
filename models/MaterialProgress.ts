import mongoose, { Schema, models, model } from 'mongoose';

const MaterialProgressSchema = new Schema(
  {
    userId: { type: String, required: true },
    materialId: {
      type: Schema.Types.ObjectId,
      ref: 'Material',
      required: true,
    },
    percent: { type: Number, default: 0 }, // 0-100
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

MaterialProgressSchema.index({ userId: 1, materialId: 1 }, { unique: true });

export default models.MaterialProgress ||
  model('MaterialProgress', MaterialProgressSchema);
