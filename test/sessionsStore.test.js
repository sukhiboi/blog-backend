const SessionsStore = require('../lib/sessionsStore');
const { assert } = require('chai');

const fakeToken = '33f2t3g';

describe('SessionStore()', () => {
  describe('#createNewSession()', () => {
    it('should give back the id of new session', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(fakeToken);
      assert.deepStrictEqual(store.getSession(id), {
        id,
        accessToken: fakeToken,
      });
    });
  });

  describe('getSession()', () => {
    it('should give back details of valid session', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(fakeToken);
      assert.deepStrictEqual(store.getSession(id), {
        accessToken: fakeToken,
        id,
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
      const id = store.createNewSession(fakeToken);
      assert.deepStrictEqual(store.getSession(id), {
        accessToken: fakeToken,
        id,
      });
      store.deleteSession(id);
      assert.isUndefined(store.getSession(id));
    });

    it('should not delete any other session if give id is invalid', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(fakeToken);
      store.deleteSession(2);
      assert.deepStrictEqual(store.getSession(id), {
        accessToken: fakeToken,
        id,
      });
    });
  });
});
