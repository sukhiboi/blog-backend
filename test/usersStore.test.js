const UsersStore = require('./../src/usersStore');
const chai = require('chai');
const assert = chai.assert;

const user = { name: 'sukhdev', imgURL: 'url', bio: 'hello' };

describe('UsersStore', () => {
  describe('addNewUser()', () => {
    it('should add a new user', () => {
      const usersStore = new UsersStore([]);
      const name = usersStore.addNewUser(user);
      assert.deepStrictEqual(user, usersStore.getUser(name));
    });
  });

  describe('getUser()', () => {
    it('should give me the user with valid username', () => {
      const usersStore = new UsersStore([]);
      const name = usersStore.addNewUser(user);
      assert.deepStrictEqual(user, usersStore.getUser(name));
    });

    it('should not give me user details when username is  invalid', () => {
      const usersStore = new UsersStore([]);
      usersStore.addNewUser(user);
      assert.isUndefined(usersStore.getUser('sam'));
    });
  });

  describe('toJSON()', () => {
    it('should return the JSON string of the store', () => {
      const usersStore = new UsersStore([]);
      usersStore.addNewUser(user);
      const json = JSON.parse(usersStore.toJSON());
      assert.deepStrictEqual(json, [[user.name, user]]);
    });
  });
});
