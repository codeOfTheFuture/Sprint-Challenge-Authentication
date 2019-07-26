const db = require('../database/dbConfig');

const Users = require('./routes-model');

describe('Users', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('add()', () => {
    it('should insert a user into the db', async () => {
      await Users.add({ username: 'test', password: 'password' });

      const users = await db('users');

      expect(users).toHaveLength(1);
    });
  });
});
