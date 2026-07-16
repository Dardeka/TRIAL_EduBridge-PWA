import mongoose, { Schema, models, model } from 'mongoose';

const DownloadSchema = new Schema(
  {
    userId: { type: String, required: true },
    materialId: { type: Schema.Types.ObjectId, ref: 'Material' },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf'], required: true },
    fileSize: { type: String, default: '0 MB' },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

export default models.Download || model('Download', DownloadSchema);
