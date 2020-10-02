class Database {
  constructor(client) {
    this.client = client;
  }

  savePost(post) {
    return this.client('posts').insert(post);
  }

  deletePost(id) {
    return this.client('posts').where('id', '=', id).del();
  }

  getPost(id) {
    return this.client('posts')
      .join('users', 'posts.user_id', '=', 'users.user_id')
      .select('*')
      .where('id', '=', id);
  }

  getUserPosts(user_id) {
    return this.client('posts')
      .join('users', 'posts.user_id', '=', 'users.user_id')
      .select('title', 'published_on', 'users.user_id', 'user_name', 'id')
      .orderBy('published_on', 'desc')
      .where('users.user_id', '=', user_id);
  }

  getAllPosts() {
    return this.client('posts')
      .join('users', 'posts.user_id', '=', 'users.user_id')
      .select('title', 'published_on', 'users.user_id', 'user_name', 'id')
      .orderBy('published_on', 'desc');
  }

  saveUser(user) {
    return this.client('users').insert(user, ['user_id']);
  }

  getUser(user_name) {
    return this.client('users').select('*').where('user_name', '=', user_name);
  }
}

module.exports = Database;
