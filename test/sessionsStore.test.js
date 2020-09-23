const SessionsStore = require('../lib/sessionsStore');
const { assert } = require('chai');

const session = { accessToken: '33f2t3g' };

describe('SessionStore()', () => {
  describe('#createNewSession()', () => {
    it('should give back the id of new session', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(session);
      assert.deepStrictEqual(store.getSession(id), { id, ...session });
    });
  });

  describe('getSession()', () => {
    it('should give back details of valid session', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(session);
      assert.deepStrictEqual(store.getSession(id), { id, ...session });
    });

    it('should fail to retrieving a invalid session', () => {
      const store = new SessionsStore();
      store.createNewSession(session);
      assert.isUndefined(store.getSession(4));
    });
  });

  describe('deleteSession()', () => {
    it('should delete a valid session', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(session);
      assert.deepStrictEqual(store.getSession(id), { id, ...session });
      store.deleteSession(id);
      assert.isUndefined(store.getSession(id));
    });

    it('should not delete any other session if give id is invalid', () => {
      const store = new SessionsStore();
      const id = store.createNewSession(session);
      store.deleteSession(2);
      assert.deepStrictEqual(store.getSession(id), { id, ...session });
    });
  });
});
