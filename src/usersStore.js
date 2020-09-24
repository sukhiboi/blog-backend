class UsersStore {
  constructor(users) {
    this.users = new Map(users);
  }

  getUser(username) {
    return this.users.get(username);
  }

  addNewUser(user) {
    this.users.set(user.name, user);
    return user.name;
  }

  toJSON() {
    const users = [];
    for (let user of this.users) users.push(user);
    return JSON.stringify(users);
  }
}

module.exports = UsersStore;
