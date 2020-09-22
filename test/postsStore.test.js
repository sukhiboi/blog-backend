const PostsStore = require('./../src/postsStore');
const { assert } = require('chai');

describe('PostsStore()', () => {
  describe('addNewPost()', () => {
    it('should add a new post in the store', () => {
      const postsStore = new PostsStore([]);
      const id = postsStore.addNewPost({ title: 'title', content: 'content' });
      const post = postsStore.getPost(id);
      assert.strictEqual(post.title, 'title');
      assert.strictEqual(post.title, 'title');
      assert.ok(post.publishedDate instanceof Date);
    });
  });

  describe('getAllPosts()', () => {
    it('should give all the posts in chronological order', () => {
      const postsStore = new PostsStore([]);
      postsStore.addNewPost({
        title: 'title',
        content: 'content',
      });
      postsStore.addNewPost({
        title: 'title1',
        content: 'content1',
      });
      const posts = postsStore.getAllPosts();
      assert.strictEqual(posts.length, 2);
      const [post1, post2] = posts;
      assert.strictEqual(post1.title, 'title1');
      assert.strictEqual(post1.title, 'title1');
      assert.ok(post1.publishedDate instanceof Date);
      assert.strictEqual(post2.title, 'title');
      assert.strictEqual(post2.title, 'title');
      assert.ok(post2.publishedDate instanceof Date);
    });
  });
});
