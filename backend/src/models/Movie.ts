import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genres: string[];
  year: number;
  director: string;
  poster: string;
  plot: string;
  runtime: number;
  rating: number;
}

const MovieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genres: {
    type: [String],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  poster: {
    type: String,
    default: 'https://via.placeholder.com/300x450'
  },
  plot: {
    type: String,
    required: true
  },
  runtime: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);