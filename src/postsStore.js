class PostStore {
  constructor(posts, lastPostId) {
    this.posts = new Map(posts);
    this.lastPostId = lastPostId;
  }

  addNewPost(post) {
    const id = this.lastPostId++;
    this.posts.set(id, { id, ...post });
    return id;
  }

  getPost(id) {
    return this.posts.get(id);
  }

  getAllPosts() {
    const posts = [];
    for (let [key, value] of this.posts) {
      posts.push(value);
    }
    return posts;
  }
}

module.exports = PostStore;
