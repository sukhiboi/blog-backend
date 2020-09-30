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

  getUserPosts(user_id) {
    return new Promise((resolve, reject) => {
      this.client('posts')
        .join('users', 'posts.user_id', '=', 'users.user_id')
        .select('title', 'published_on', 'users.user_id', 'id', 'user_name')
        .where('users.user_id', '=', user_id)
        .then(resolve)
        .catch(reject);
    });
  }

  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.client('posts')
        .join('users', 'posts.user_id', '=', 'users.user_id')
        .select('title', 'published_on', 'users.user_id', 'id', 'user_name')
        .orderBy('published_on', 'desc')
        .then(resolve)
        .catch(reject);
    });
  }

  saveUser(user) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .insert(user, ['user_id'])
        .then(resolve)
        .catch(reject);
    });
  }

  getUser(user_name) {
    return new Promise((resolve, reject) => {
      this.client('users')
        .select('*')
        .where('user_name', '=', user_name)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Database;
