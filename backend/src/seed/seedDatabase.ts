import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from '../models/Movie';
import { seedMovies } from './movies';

dotenv.config();

const seedDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinelog';
    await mongoose.connect(mongoURI);

    console.log('🌱 Starting database seed...');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('🗑️  Cleared existing movies');

    // Insert seed movies
    await Movie.insertMany(seedMovies);
    console.log(`✅ Inserted ${seedMovies.length} movies`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();