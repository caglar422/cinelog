import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../routes/authRoutes';
import User from '../models/User';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe('testuser');
    expect(res.body.user.email).toBe('test@test.com');
    expect(res.body.user.isAdmin).toBe(false);
  });

  it('should not register with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser' });

    expect(res.status).toBe(400);
  });

  it('should not register duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'user1', email: 'test@test.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'user2', email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should not register duplicate username', async () => {
    await User.create({
      username: 'testuser',
      email: 'test1@test.com',
      password: 'hashedpassword',
      isAdmin: false
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test2@test.com', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@test.com', password: 'password123' });
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('test@test.com');
    expect(res.body.user.isAdmin).toBeDefined();
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('should not login with non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'notexist@test.com', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com' });

    expect(res.status).toBe(400);
  });
});