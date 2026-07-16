import mongoose, { Schema, models, model } from 'mongoose';

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // index of options
    explanation: { type: String },
  },
  { _id: true }
);

const QuizSchema = new Schema(
  {
    materialId: {
      type: Schema.Types.ObjectId,
      ref: 'Material',
      required: true,
    },
    title: { type: String, required: true },
    questions: [QuestionSchema],
    passingScore: { type: Number, default: 70 },
  },
  { timestamps: true }
);

export default models.Quiz || model('Quiz', QuizSchema);
