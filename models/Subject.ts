import mongoose, { Schema, models, model } from 'mongoose';

const SubjectSchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, default: 'book' },
    color: { type: String, default: '#3B82F6' },
  },
  { timestamps: true }
);

export default models.Subject || model('Subject', SubjectSchema);
