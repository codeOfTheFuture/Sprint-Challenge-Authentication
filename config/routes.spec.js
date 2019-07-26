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
          console.log('res status', res.status);
          expect(res.status).toBe(201);
        });
    });
  });

  const token = '';

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

  describe('POST /api/login', () => {
    it('should return json ', () => {
      return request(server)
        .post('/api/login')
        .send({ username: 'testUser1', password: 'password' })
        .then(res => {
          expect(res.body).toHaveProperty('token');
        });
    });
  });
});
