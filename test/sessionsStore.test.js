const SessionsStore = require('../lib/sessionsStore');
const { assert } = require('chai');

const fakeToken = '33f2t3g';

describe('SessionStorage()', () => {
  describe('#createNewSession()', () => {
    it('should give back the id of new session', () => {
      const store = new SessionsStore();
      assert.strictEqual(store.createNewSession(fakeToken), 0);
    });
  });

  describe('getSession()', () => {
    it('should give back details of valid session', () => {
      const store = new SessionsStore();
      store.createNewSession(fakeToken);
      assert.deepStrictEqual(store.getSession(0), {
        accessToken: fakeToken,
        id: 0,
      });
    });

    it('should fail to retrieving a invalid session', () => {
      const store = new SessionsStore();
      store.createNewSession(fakeToken);
      assert.isUndefined(store.getSession(4));
    });
  });

  describe('deleteSession()', () => {
    it('should delete a valid session', () => {
      const store = new SessionsStore();
      store.createNewSession(fakeToken);
      assert.deepStrictEqual(store.getSession(0), {
        accessToken: fakeToken,
        id: 0,
      });
      store.deleteSession(0);
      assert.isUndefined(store.getSession(0));
    });

    it('should not delete any other session if give id is invalid', () => {
      const store = new SessionsStore();
      store.createNewSession(fakeToken);
      store.deleteSession(2);
      assert.deepStrictEqual(store.getSession(0), {
        accessToken: fakeToken,
        id: 0,
      });
    });
  });
});
