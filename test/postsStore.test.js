const PostsStore = require('./../src/postsStore');
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('chai-uuid'));
const assert = chai.assert;

const fakePost = { title: 'title', content: 'content', name: 'sukhdev' };

let clock;
beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

describe('PostsStore()', () => {
  describe('addNewPost()', () => {
    it('should add a new post in the store', () => {
      const postsStore = new PostsStore([]);
      const id = postsStore.addNewPost(fakePost);
      assert.uuid(id, 'v4');
      const post = postsStore.getPost(id);
      assert.deepStrictEqual(post, {
        ...fakePost,
        publishedDate: new Date(),
        id,
      });
    });
  });

  describe('deletePost()', () => {
    it('should delete a post', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost(fakePost);
      const pId2 = postsStore.addNewPost(fakePost);
      assert.uuid(pId1, 'v4');
      assert.uuid(pId2, 'v4');
      const toBeDeletePost = postsStore.getPost(pId1, 'sam');
      const deletedPost = postsStore.deletePost(pId1);
      assert.deepStrictEqual(toBeDeletePost, deletedPost);
    });

    it('should not delete a post if id is invalid', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost(fakePost);
      const pId2 = postsStore.addNewPost(fakePost);
      assert.uuid(pId1, 'v4');
      assert.uuid(pId2, 'v4');
      const deletedPost = postsStore.deletePost(34);
      assert.isUndefined(deletedPost);
      assert.strictEqual(postsStore.getAllPosts().length, 2);
    });
  });

  describe('getPost()', () => {
    it('should get the post of different user', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost(fakePost);
      const post = postsStore.getPost(pId1, 'sam');
      assert.deepStrictEqual(post, {
        ...fakePost,
        id: pId1,
        publishedDate: new Date(),
      });
    });

    it('should get the post of logged in user', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost(fakePost);
      const post = postsStore.getPost(pId1, 'sukhdev');
      assert.deepStrictEqual(post, {
        ...fakePost,
        id: pId1,
        publishedDate: new Date(),
        isMyPost: true,
      });
    });
  });

  describe('getUserPosts()', () => {
    it('should give all the post of the user asked', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost({ ...fakePost, name: 'sam' });
      const pId2 = postsStore.addNewPost(fakePost);
      assert.uuid(pId1, 'v4');
      assert.uuid(pId2, 'v4');
      const posts = postsStore.getUserPosts('sukhdev');
      assert.deepStrictEqual(posts, [
        { ...fakePost, id: pId2, publishedDate: new Date() },
      ]);
    });
  });

  describe('getAllPosts()', () => {
    context('should give all the posts in chronological order', () => {
      it('should mark the user posts as their posts', () => {
        const postsStore = new PostsStore([]);
        const pId1 = postsStore.addNewPost(fakePost);
        const pId2 = postsStore.addNewPost(fakePost);
        assert.uuid(pId1, 'v4');
        assert.uuid(pId2, 'v4');
        const posts = postsStore.getAllPosts('sukhdev');
        assert.strictEqual(posts.length, 2);
        assert.deepStrictEqual(posts[0], {
          ...fakePost,
          id: pId2,
          publishedDate: new Date(),
          isMyPost: true,
        });
        assert.deepStrictEqual(posts[1], {
          ...fakePost,
          id: pId1,
          publishedDate: new Date(),
          isMyPost: true,
        });
      });
    });
  });

  describe('toJSON()', () => {
    it('should return the JSON representation of the store', () => {
      const postsStore = new PostsStore([]);
      const pId1 = postsStore.addNewPost(fakePost);
      assert.uuid(pId1, 'v4');
      const json = JSON.parse(postsStore.toJSON());
      assert.deepStrictEqual(json, [
        [pId1, { ...fakePost, id: pId1, publishedDate: new Date().toJSON() }],
      ]);
    });
  });
});
