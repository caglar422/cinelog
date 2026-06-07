import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from '../routes/movieRoutes';
import Movie from '../models/Movie';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());
app.use('/api/movies', movieRoutes);

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  await User.deleteMany({});

  const adminUser = await User.create({
    username: 'adminuser',
    email: 'admin@test.com',
    password: await bcrypt.hash('password123', 10),
    isAdmin: true
  });

  const normalUser = await User.create({
    username: 'normaluser',
    email: 'user@test.com',
    password: await bcrypt.hash('password123', 10),
    isAdmin: false
  });

  adminToken = jwt.sign(
    { userId: adminUser._id.toString() },
    process.env.JWT_SECRET || 'fallback_secret'
  );

  userToken = jwt.sign(
    { userId: normalUser._id.toString() },
    process.env.JWT_SECRET || 'fallback_secret'
  );
});

afterAll(async () => {
  await User.deleteMany({});
  await Movie.deleteMany({});
  await mongoose.connection.close();
});

afterEach(async () => {
  await Movie.deleteMany({});
});

describe('GET /api/movies', () => {
  it('should return all movies', async () => {
    await Movie.create({
      title: 'Test Movie',
      year: 2021,
      genres: ['Action'],
      director: 'Test Director',
      rating: 7.5,
      image_url: 'http://test.com/image.jpg',
      plot: 'Test plot',
      runtime: 120
    });

    const res = await request(app).get('/api/movies');
    expect(res.status).toBe(200);
    expect(res.body.movies).toHaveLength(1);
    expect(res.body.movies[0].title).toBe('Test Movie');
  });

  it('should filter movies by genre', async () => {
    await Movie.create([
      { title: 'Action Movie', year: 2021, genres: ['Action'], director: 'Director', rating: 7, image_url: 'http://test.com/1.jpg', plot: 'Plot', runtime: 100 },
      { title: 'Drama Movie', year: 2021, genres: ['Drama'], director: 'Director', rating: 7, image_url: 'http://test.com/2.jpg', plot: 'Plot', runtime: 100 }
    ]);

    const res = await request(app).get('/api/movies?genre=Action');
    expect(res.status).toBe(200);
    expect(res.body.movies).toHaveLength(1);
    expect(res.body.movies[0].title).toBe('Action Movie');
  });

  it('should filter movies by year', async () => {
    await Movie.create([
      { title: 'Old Movie', year: 2000, genres: ['Drama'], director: 'Director', rating: 7, image_url: 'http://test.com/1.jpg', plot: 'Plot', runtime: 100 },
      { title: 'New Movie', year: 2021, genres: ['Drama'], director: 'Director', rating: 7, image_url: 'http://test.com/2.jpg', plot: 'Plot', runtime: 100 }
    ]);

    const res = await request(app).get('/api/movies?year=2021');
    expect(res.status).toBe(200);
    expect(res.body.movies).toHaveLength(1);
    expect(res.body.movies[0].title).toBe('New Movie');
  });
});

describe('GET /api/movies/:id', () => {
  it('should return a single movie', async () => {
    const movie = await Movie.create({
      title: 'Test Movie',
      year: 2021,
      genres: ['Action'],
      director: 'Test Director',
      rating: 7.5,
      image_url: 'http://test.com/image.jpg',
      plot: 'Test plot',
      runtime: 120
    });

    const res = await request(app).get(`/api/movies/${movie._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test Movie');
  });

  it('should return 404 for non-existent movie', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/movies/${fakeId}`);
    expect(res.status).toBe(404);
  });
});

describe('POST /api/movies', () => {
  it('should create a movie when admin', async () => {
    const res = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'New Movie',
        year: 2023,
        genres: ['Action'],
        director: 'Director',
        rating: 8,
        image_url: 'http://test.com/image.jpg',
        plot: 'Some plot',
        runtime: 130
      });

    expect(res.status).toBe(201);
    expect(res.body.movie.title).toBe('New Movie');
  });

  it('should reject movie creation when not admin', async () => {
    const res = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'New Movie',
        year: 2023,
        genres: ['Action'],
        director: 'Director',
        rating: 8,
        image_url: 'http://test.com/image.jpg',
        plot: 'Some plot',
        runtime: 130
      });

    expect(res.status).toBe(403);
  });

  it('should reject movie creation without token', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({ title: 'New Movie' });

    expect(res.status).toBe(401);
  });
});

describe('PUT /api/movies/:id', () => {
  it('should update a movie when admin', async () => {
    const movie = await Movie.create({
      title: 'Old Title',
      year: 2021,
      genres: ['Action'],
      director: 'Director',
      rating: 7,
      image_url: 'http://test.com/image.jpg',
      plot: 'Plot',
      runtime: 120
    });

    const res = await request(app)
      .put(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'New Title', year: 2021, genres: ['Action'], director: 'Director', rating: 7, image_url: 'http://test.com/image.jpg', plot: 'Plot', runtime: 120 });

    expect(res.status).toBe(200);
    expect(res.body.movie.title).toBe('New Title');
  });

  it('should reject update when not admin', async () => {
    const movie = await Movie.create({
      title: 'Old Title',
      year: 2021,
      genres: ['Action'],
      director: 'Director',
      rating: 7,
      image_url: 'http://test.com/image.jpg',
      plot: 'Plot',
      runtime: 120
    });

    const res = await request(app)
      .put(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'New Title' });

    expect(res.status).toBe(403);
  });
});

describe('DELETE /api/movies/:id', () => {
  it('should delete a movie when admin', async () => {
    const movie = await Movie.create({
      title: 'To Delete',
      year: 2021,
      genres: ['Action'],
      director: 'Director',
      rating: 7,
      image_url: 'http://test.com/image.jpg',
      plot: 'Plot',
      runtime: 120
    });

    const res = await request(app)
      .delete(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    const deleted = await Movie.findById(movie._id);
    expect(deleted).toBeNull();
  });

  it('should reject delete when not admin', async () => {
    const movie = await Movie.create({
      title: 'To Delete',
      year: 2021,
      genres: ['Action'],
      director: 'Director',
      rating: 7,
      image_url: 'http://test.com/image.jpg',
      plot: 'Plot',
      runtime: 120
    });

    const res = await request(app)
      .delete(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});