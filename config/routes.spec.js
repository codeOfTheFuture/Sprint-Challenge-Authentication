const request = require('supertest');

const server = require('../api/server');

describe('routes', () => {
  it('db environment set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST /api/register', () => {
    it('should return a status of 201 created', () => {
      return request(server)
        .post('/api/register')
        .send({ username: 'testUser1', password: 'password' })
        .then(res => {
          console.log('res body', res.body);
          expect(res.status).toBe(201);
        });
    });

    it('should return a id and username', () => {
      return request(server)
        .post('/api/register')
        .send({ username: 'testUser2', password: 'password' })
        .then(res => {
          console.log('res body', res.body);
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('username');
        });
    });
  });

  let token;

  describe('POST /api/login', () => {
    it('should return a status of 200', () => {
      return request(server)
        .post('/api/login')
        .send({ username: 'testUser1', password: 'password' })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  it('should return a property token ', () => {
    return request(server)
      .post('/api/login')
      .send({ username: 'testUser1', password: 'password' })
      .then(res => {
        console.log('token', res.body.token);
        expect(res.body).toHaveProperty('token');
      });
  });

  describe('GET /api/jokes', () => {
    it('should return a 401 status without a valid token', () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});
