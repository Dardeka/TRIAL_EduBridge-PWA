import mongoose, { Schema, models, model } from 'mongoose';

const ChapterSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    duration: { type: String, default: '0 min' },
    order: { type: Number, default: 0 },
    videoUrl: { type: String },
    pdfUrl: { type: String },
  },
  { _id: true }
);

const MaterialSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'text'], required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    level: { type: String, enum: ['SD', 'SMP', 'SMA'], required: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    icon: { type: String, default: '📘' },
    duration: { type: String, default: '0 min' },
    fileSize: { type: String, default: '0 MB' },
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    views: { type: Number, default: 0 },
    chapters: [ChapterSchema],
    status: {
      type: String,
      enum: ['draft', 'review', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export default models.Material || model('Material', MaterialSchema);
