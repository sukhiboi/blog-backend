class Sessions {
  constructor(client) {
    this.client = client;
  }

  createSession(user) {
    return new Promise((resolve, reject) => {
      this.client.set(`${user.user_id}`, JSON.stringify(user), (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  getSession(id) {
    return new Promise((resolve, reject) => {
      this.client.get(`${id}`, (err, reply) => {
        if (err) reject(err);
        resolve(JSON.parse(reply));
      });
    });
  }

  deleteSession(id) {
    return new Promise((resolve, reject) => {
      this.client.del(`${id}`, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

module.exports = Sessions;
