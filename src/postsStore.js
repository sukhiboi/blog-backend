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

  getPost(id) {
    return this.posts.get(id);
  }

  getAllPosts() {
    const posts = [];
    for (let [key, value] of this.posts) posts.unshift(value);
    return posts;
  }

  toJSON() {
    const posts = [];
    for (let post of this.posts) posts.push([...post]);
    return JSON.stringify(posts);
  }
}

module.exports = PostStore;
