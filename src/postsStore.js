class PostStore {
  constructor(posts, lastPostId = 0) {
    this.posts = new Map(posts);
    this.lastPostId = lastPostId;
  }

  addNewPost(post) {
    const id = ++this.lastPostId;
    this.posts.set(id, { id, publishedDate: new Date(), ...post });
    return id;
  }

  getPost(id) {
    return this.posts.get(+id);
  }

  getAllPosts() {
    const posts = [];
    for (let [key, value] of this.posts) {
      posts.unshift(value);
    }
    return posts;
  }
}

module.exports = PostStore;
