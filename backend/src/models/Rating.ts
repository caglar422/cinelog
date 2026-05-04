import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  score: number;
  createdAt: Date;
}

const RatingSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bir kullanıcı bir filme sadece bir kez puan verebilir
RatingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model<IRating>('Rating', RatingSchema);