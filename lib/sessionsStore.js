class SessionsStore {
  constructor() {
    this.sessions = new Map();
    this.lastId = 0;
  }

  createNewSession(accessToken) {
    const id = this.lastId++;
    this.sessions.set(id, { accessToken, id });
    return id;
  }

  deleteSession(id) {
    this.sessions.delete(+id);
  }

  getSession(id) {
    return this.sessions.get(+id);
  }
}

module.exports = SessionsStore;
