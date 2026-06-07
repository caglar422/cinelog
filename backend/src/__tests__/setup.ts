import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const mongod = new MongoMemoryServer();
  await mongod.start();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  (global as any).__MONGOD__ = mongod;
};