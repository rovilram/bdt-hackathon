const mongoose = require('mongoose');
const app = require('../app');
const server = require('../bin/www');
const supertest = require('supertest');

const api = supertest(app);

test('server is running', async () => {
  await api.get('/').expect(200);
});

test('404 error if endpoint no exists', async () => {
  await api.get('/noendpoint').expect(404);
});

describe('Auth endpoints are working', () => {
  test('login endpoint is working', async () => {
    await api.post('/login').expect(200);
  });

  test('register endpoint is working', async () => {
    await api.post('/register').expect(200);
  });
});

describe('User endpoints are working', () => {
  test('get user endpoint', async () => {
    const id = 100;

    await api.get(`/user/${id}`).expect(200);
  });

  test('delete user endpoint', async () => {
    const id = 100;

    await api.delete(`/user/${id}`).expect(200);
  });

  test('update user endpoint', async () => {
    const id = 100;

    await api.put(`/user/${id}`).expect(200);
  });

  test('add user endpoint', async () => {
    await api.post(`/user/`).expect(200);
  });

  test('get github user data endpoint', async () => {
    const id = 100;
    await api.get(`/user/${id}/github`).expect(200);
  });

  test('get gitlab user data endpoint', async () => {
    const id = 100;
    await api.get(`/user/${id}/gitlab`).expect(200);
  });
});


describe('github endpoints are working', () => {
  test('add github username to user', async () => {
    const username = 'testUser';
    await api.post(`/github/${username}`).expect(200);
  });
});

describe('gitlab endpoints are working', () => {
  test('add gitlab username to user', async () => {
    const username = 'testUser';
    await api.post(`/gitlab/${username}`).expect(200);
  });
});

describe('country endpoints are working', () => {
  test('get countries list', async () => {
    await api.get(`/countries`).expect(200);
  });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
