class Database {
  constructor(client) {
    this.client = client;
  }

  savePost(post) {
    return new Promise((resolve, reject) => {
      this.client('posts').insert(post).then(resolve).catch(reject);
    });
  }

  deletePost(id) {
    return new Promise((resolve, reject) => {
      this.client('posts')
        .where('id', '=', id)
        .del()
        .then(resolve)
        .catch(reject);
    });
  }

  getPost(id) {
    return new Promise((resolve, reject) => {
      this.client('posts')
        .join('users', 'posts.user_id', '=', 'users.user_id')
        .select('*')
        .where('id', '=', id)
        .then(resolve)
        .catch(reject);
    });
  }

  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.client('posts')
        .join('users', 'posts.user_id', '=', 'users.user_id')
        .select('*')
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Database;
