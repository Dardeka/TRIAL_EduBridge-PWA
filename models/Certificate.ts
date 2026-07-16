import mongoose, { Schema, models, model } from 'mongoose';

const CertificateSchema = new Schema(
  {
    userId: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
    title: { type: String, required: true },
    score: { type: Number, default: 0 },
    issuedAt: { type: Date, default: Date.now },
    fileUrl: { type: String },
  },
  { timestamps: true }
);

CertificateSchema.index({ userId: 1, title: 1 }, { unique: true });

export default models.Certificate || model('Certificate', CertificateSchema);
