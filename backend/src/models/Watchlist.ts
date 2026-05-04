import mongoose, { Document, Schema } from 'mongoose';

export interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  addedAt: Date;
}

const WatchlistSchema: Schema = new Schema({
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
  addedAt: {
    type: Date,
    default: Date.now
  }
});

WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);