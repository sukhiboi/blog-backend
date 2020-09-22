const uuid = require('uuid');

class SessionsStore {
  constructor(sessions) {
    this.sessions = new Map(sessions);
  }

  createNewSession(accessToken) {
    const id = uuid.v4();
    this.sessions.set(id, { accessToken, id });
    return id;
  }

  deleteSession(id) {
    this.sessions.delete(id);
  }

  getSession(id) {
    return this.sessions.get(id);
  }

  toJSON() {
    const sessions = [];
    for (let session of this.sessions) sessions.push([...session]);
    return JSON.stringify(sessions);
  }
}

module.exports = SessionsStore;
