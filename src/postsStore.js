const uuid = require('uuid');

class PostStore {
  constructor(posts) {
    this.posts = new Map(posts);
  }

  addNewPost(post) {
    const id = uuid.v4();
    this.posts.set(id, { id, publishedDate: new Date(), ...post });
    return id;
  }

  deletePost(id) {
    const post = this.posts.get(id);
    this.posts.delete(id);
    return post;
  }

  getPost(id, username) {
    const post = this.posts.get(id);
    if (post.name === username) return { ...post, isMyPost: true };
    return post;
  }

  getUserPosts(username) {
    const posts = [];
    for (let [key, value] of this.posts)
      if (value.name === username) posts.unshift(value);
    return posts;
  }

  getAllPosts(username) {
    const posts = [];
    for (let [key, value] of this.posts) {
      if (value.name === username) posts.unshift({ ...value, isMyPost: true });
      else posts.unshift(value);
    }
    return posts;
  }

  toJSON() {
    const posts = [];
    for (let post of this.posts) posts.push([...post]);
    return JSON.stringify(posts);
  }
}

module.exports = PostStore;
