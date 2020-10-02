const { assert } = require('chai');
const { fake } = require('sinon');
const Sessions = require('./../src/sessions');

describe('Sessions', () => {
  describe('createSession', () => {
    it('should resolve when session get created', async () => {
      const fakeSet = fake.yields(null, 'OK');
      const redisClient = { set: fakeSet };
      const sessions = new Sessions(redisClient);
      const user = { user_id: 1 };
      const reply = await sessions.createSession(user);
      assert.strictEqual(reply, 'OK');
      assert.strictEqual(fakeSet.callCount, 1);
      assert.ok(fakeSet.calledWith('1', JSON.stringify(user)));
    });

    it('should reject when session error occurs', async () => {
      const error = new Error('redis connection failed');
      const fakeSet = fake.yields(error, null);
      const redisClient = { set: fakeSet };
      const sessions = new Sessions(redisClient);
      const user = { user_id: 1 };
      try {
        await sessions.createSession(user);
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(fakeSet.callCount, 1);
        assert.ok(fakeSet.calledWith('1', JSON.stringify(user)));
      }
    });
  });

  describe('getSession', () => {
    it('should resolve with the session', async () => {
      const user = { user_id: 1 };
      const fakeGet = fake.yields(null, JSON.stringify(user));
      const redisClient = { get: fakeGet };
      const sessions = new Sessions(redisClient);
      const reply = await sessions.getSession('1');
      assert.deepStrictEqual(reply, user);
      assert.strictEqual(fakeGet.callCount, 1);
      assert.ok(fakeGet.calledWith('1'));
    });

    it('should reject when session error occurs', async () => {
      const error = new Error('redis connection failed');
      const fakeGet = fake.yields(error, null);
      const redisClient = { get: fakeGet };
      const sessions = new Sessions(redisClient);
      try {
        await sessions.getSession('1');
      } catch (e) {
        assert.deepStrictEqual(e, error);
        assert.strictEqual(fakeGet.callCount, 1);
        assert.ok(fakeGet.calledWith('1'));
      }
    });
  });

  describe('deleteSession', () => {
    it('should resolve after deleting session session', async () => {
      const fakeDel = fake.yields(null, 'OK');
      const redisClient = { del: fakeDel };
      const sessions = new Sessions(redisClient);
      const reply = await sessions.deleteSession('1');
      assert.deepStrictEqual(reply, 'OK');
      assert.strictEqual(fakeDel.callCount, 1);
      assert.ok(fakeDel.calledWith('1'));
    });

    it('should reject when session error occurs', async () => {
      const error = new Error('redis connection failed');
      const fakeDel = fake.yields(error, null);
      const redisClient = { del: fakeDel };
      const sessions = new Sessions(redisClient);
      try {
        await sessions.deleteSession('1');
      } catch (e) {
        assert.deepStrictEqual(e, error);
        assert.strictEqual(fakeDel.callCount, 1);
        assert.ok(fakeDel.calledWith('1'));
      }
    });
  });
});
