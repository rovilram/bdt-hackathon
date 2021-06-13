const mongoose = require('../app/database');
const app = require('../app');
const server = require('../bin/www');
const supertest = require('supertest');
const User = require('../api/user/model');
const UserGithub = require('../api/githubUser/model');
const UserGitlab = require('../api/gitlabUser/model');
const Country = require('../api/country/model');

const api = supertest(app);

let cookie;

beforeAll(async () => {
  await User.deleteMany({});
  await UserGithub.deleteMany({});
  await UserGitlab.deleteMany({});
  await Country.deleteMany({});
});

test('server is running', async () => {
  await api.get('/').expect(200);
});

test('404 error if endpoint no exists', async () => {
  await api.get('/noendpoint').expect(404);
});

describe('Auth endpoints are working', () => {
  test('register endpoint is working', async () => {
    await api
      .post('/register')
      .send({
        username: 'testUser',
        password: 'Aa#00000',
        email: 'testUser@gmail.com',
      })
      .expect(200);
  });
  test('login endpoint is working', async () => {
    await api
      .post('/login')
      .send({
        username: 'testUser',
        password: 'Aa#00000',
      })
      .expect(200);
  });
});

describe('User endpoints are working', () => {
  test('get user endpoint', async () => {
    const loginResponse = await api.post('/login').send({
      username: 'testUser',
      password: 'Aa#00000',
    });

    const cookie = loginResponse.headers['set-cookie'];

    console.log("cookie", cookie);

    const id = 100;

    await api.get(`/user/${id}`).set('Cookie', cookie).expect(200);
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
