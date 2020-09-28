class SessionsStore {
  constructor(sessions) {
    this.sessions = new Map(sessions);
  }

  createNewSession(user) {
    this.sessions.set(user.user_id, user);
    return user.user_id;
  }

  deleteSession(user_id) {
    this.sessions.delete(user_id);
  }

  getSession(user_id) {
    return this.sessions.get(+user_id);
  }

  toJSON() {
    const sessions = [];
    for (let session of this.sessions) sessions.push([...session]);
    return JSON.stringify(sessions);
  }
}

module.exports = SessionsStore;
