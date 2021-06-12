const mongoose = require('mongoose');
const app = require('../app');
const server = require('../bin/www');
const supertest = require('supertest');

const api = supertest(app);

test('non existing endpoint', async () => {
  await api.get('/noendpoint').expect(404);
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
