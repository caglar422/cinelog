import mongoose, { Document, Schema } from 'mongoose';

export interface IWatched extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  watchedAt: Date;
}

const WatchedSchema: Schema = new Schema({
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
  watchedAt: {
    type: Date,
    default: Date.now
  }
});

// Bir kullanıcı bir filmi watched'e sadece bir kez ekleyebilir
WatchedSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model<IWatched>('Watched', WatchedSchema);