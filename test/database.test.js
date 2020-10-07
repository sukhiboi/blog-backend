const { assert } = require('chai');
const { fake } = require('sinon');
const Database = require('./../src/database');

describe('Database', () => {
  const error = new Error('postgres connection failed');

  describe('savePost', () => {
    it('should resolve if post got saved', async () => {
      const fakeInsert = fake.resolves('OK');
      const client = fake.returns({ insert: fakeInsert });
      const post = { postId: 1 };
      const db = new Database(client);
      const res = await db.savePost(post);
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeInsert.callCount, 1);
      assert.ok(fakeInsert.calledWith(post));
    });

    it('should reject if error occurs', async () => {
      const fakeInsert = fake.rejects(error);
      const client = fake.returns({ insert: fakeInsert });
      const post = { postId: 1 };
      const db = new Database(client);
      try {
        await db.savePost(post);
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeInsert.callCount, 1);
        assert.ok(fakeInsert.calledWith(post));
      }
    });
  });

  describe('updatePost', () => {
    it('should update the post with new details', async () => {
      const fakeUpdate = fake.resolves('OK');
      const fakeWhere = fake.returns({ update: fakeUpdate });
      const client = fake.returns({ where: fakeWhere });
      const updatedPost = { title: 'new Title', content: 'new Content' };
      const db = new Database(client);
      const res = await db.updatePost(1, updatedPost);
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('id', '=', 1));
      assert.strictEqual(fakeUpdate.callCount, 1);
      assert.ok(fakeUpdate.calledWith(updatedPost));
    });

    it('should reject if error occurs', async () => {
      const fakeUpdate = fake.rejects(error);
      const fakeWhere = fake.returns({ update: fakeUpdate });
      const client = fake.returns({ where: fakeWhere });
      const updatedPost = { title: 'new Title', content: 'new Content' };
      const db = new Database(client);
      try {
        await db.updatePost(1, updatedPost);
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('id', '=', 1));
        assert.strictEqual(fakeUpdate.callCount, 1);
        assert.ok(fakeUpdate.calledWith(updatedPost));
      }
    });
  });

  describe('deletePost', () => {
    it('should resolve after deleting post', async () => {
      const fakeDel = fake.resolves('OK');
      const fakeWhere = fake.returns({ del: fakeDel });
      const client = fake.returns({ where: fakeWhere });
      const db = new Database(client);
      const res = await db.deletePost(1);
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('id', '=', 1));
      assert.strictEqual(fakeDel.callCount, 1);
    });

    it('should reject if error occurs', async () => {
      const fakeDel = fake.rejects(error);
      const fakeWhere = fake.returns({ del: fakeDel });
      const client = fake.returns({ where: fakeWhere });
      const db = new Database(client);
      try {
        await db.deletePost(1);
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('id', '=', 1));
        assert.strictEqual(fakeDel.callCount, 1);
      }
    });
  });

  describe('getPost', () => {
    it('should resolve post', async () => {
      const fakeWhere = fake.resolves('OK');
      const fakeSelect = fake.returns({ where: fakeWhere });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      const res = await db.getPost(1);
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeJoin.callCount, 1);
      assert.ok(
        fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
      );
      assert.strictEqual(fakeSelect.callCount, 1);
      assert.ok(fakeSelect.calledWith('*'));
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('id', '=', 1));
    });

    it('should reject if error occurs', async () => {
      const fakeWhere = fake.rejects(error);
      const fakeSelect = fake.returns({ where: fakeWhere });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      try {
        await db.getPost(1);
      } catch (e) {
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeJoin.callCount, 1);
        assert.ok(
          fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
        );
        assert.strictEqual(fakeSelect.callCount, 1);
        assert.ok(fakeSelect.calledWith('*'));
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('id', '=', 1));
      }
    });
  });

  describe('getUserPost', () => {
    it('should resolve user posts', async () => {
      const fakeWhere = fake.resolves('OK');
      const fakeOrderBy = fake.returns({ where: fakeWhere });
      const fakeSelect = fake.returns({ orderBy: fakeOrderBy });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      const res = await db.getUserPosts(1);
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeJoin.callCount, 1);
      assert.ok(
        fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
      );
      assert.strictEqual(fakeSelect.callCount, 1);
      assert.ok(
        fakeSelect.calledWith(
          'title',
          'published_on',
          'users.user_id',
          'user_name',
          'id'
        )
      );
      assert.strictEqual(fakeOrderBy.callCount, 1);
      assert.ok(fakeOrderBy.calledWith('published_on', 'desc'));
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('users.user_id', '=', 1));
    });

    it('should reject if error occurs', async () => {
      const fakeWhere = fake.resolves('OK');
      const fakeOrderBy = fake.returns({ where: fakeWhere });
      const fakeSelect = fake.returns({ orderBy: fakeOrderBy });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      try {
        await db.getUserPosts(1);
      } catch (e) {
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeJoin.callCount, 1);
        assert.ok(
          fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
        );
        assert.strictEqual(fakeSelect.callCount, 1);
        assert.ok(
          fakeSelect.calledWith(
            'title',
            'published_on',
            'users.user_id',
            'user_name',
            'id'
          )
        );
        assert.strictEqual(fakeOrderBy.callCount, 1);
        assert.ok(fakeOrderBy.calledWith('published_on', 'desc'));
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('users.user_id', '=', 1));
      }
    });
  });

  describe('getAllPosts', () => {
    it('should resolve all posts', async () => {
      const fakeOrderBy = fake.resolves('OK');
      const fakeWhere = fake.returns({ orderBy: fakeOrderBy });
      const fakeSelect = fake.returns({ where: fakeWhere });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      const res = await db.getAllPosts('home');
      assert.strictEqual(res, 'OK');
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('posts'));
      assert.strictEqual(fakeJoin.callCount, 1);
      assert.ok(
        fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
      );
      assert.strictEqual(fakeSelect.callCount, 1);
      assert.ok(
        fakeSelect.calledWith(
          'title',
          'published_on',
          'users.user_id',
          'user_name',
          'id'
        )
      );
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('title', 'ilike', '%home%'));
      assert.strictEqual(fakeOrderBy.callCount, 1);
      assert.ok(fakeOrderBy.calledWith('published_on', 'desc'));
    });

    it('should reject if error occurs', async () => {
      const fakeOrderBy = fake.resolves('OK');
      const fakeWhere = fake.returns({ orderBy: fakeOrderBy });
      const fakeSelect = fake.returns({ where: fakeWhere });
      const fakeJoin = fake.returns({ select: fakeSelect });
      const client = fake.returns({ join: fakeJoin });
      const db = new Database(client);
      try {
        await db.getAllPosts('home');
      } catch (e) {
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('posts'));
        assert.strictEqual(fakeJoin.callCount, 1);
        assert.ok(
          fakeJoin.calledWith('users', 'posts.user_id', '=', 'users.user_id')
        );
        assert.strictEqual(fakeSelect.callCount, 1);
        assert.ok(
          fakeSelect.calledWith(
            'title',
            'published_on',
            'users.user_id',
            'user_name',
            'id'
          )
        );
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('title', 'ilike', '%home%'));
        assert.strictEqual(fakeOrderBy.callCount, 1);
        assert.ok(fakeOrderBy.calledWith('published_on', 'desc'));
      }
    });
  });

  describe('saveUser', () => {
    it('should resolve after saving user', async () => {
      const user = { user_name: 'sukhi' };
      const fakeInsert = fake.resolves(1);
      const client = fake.returns({ insert: fakeInsert });
      const db = new Database(client);
      const res = await db.saveUser(user);
      assert.strictEqual(res, 1);
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('users'));
      assert.strictEqual(fakeInsert.callCount, 1);
      assert.ok(fakeInsert.calledWith(user, ['user_id']));
    });

    it('should reject if error occurs', async () => {
      const user = { user_name: 'sukhi' };
      const fakeInsert = fake.rejects(error);
      const client = fake.returns({ insert: fakeInsert });
      const db = new Database(client);
      try {
        await db.saveUser(user);
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('users'));
        assert.strictEqual(fakeInsert.callCount, 1);
        assert.ok(fakeInsert.calledWith(user, ['user_id']));
      }
    });
  });

  describe('getUser', () => {
    it('should resolve with user', async () => {
      const user = { user_name: 'sukhi' };
      const fakeWhere = fake.resolves(user);
      const fakeSelect = fake.returns({ where: fakeWhere });
      const client = fake.returns({ select: fakeSelect });
      const db = new Database(client);
      const res = await db.getUser('sukhi');
      assert.strictEqual(res, user);
      assert.strictEqual(client.callCount, 1);
      assert.ok(client.calledWith('users'));
      assert.strictEqual(fakeSelect.callCount, 1);
      assert.ok(fakeSelect.calledWith('*'));
      assert.strictEqual(fakeWhere.callCount, 1);
      assert.ok(fakeWhere.calledWith('user_name', '=', 'sukhi'));
    });

    it('should reject if error occurs', async () => {
      const fakeWhere = fake.rejects(error);
      const fakeSelect = fake.returns({ where: fakeWhere });
      const client = fake.returns({ select: fakeSelect });
      const db = new Database(client);
      try {
        await db.getUser('sukhi');
      } catch (e) {
        assert.strictEqual(e, error);
        assert.strictEqual(client.callCount, 1);
        assert.ok(client.calledWith('users'));
        assert.strictEqual(fakeSelect.callCount, 1);
        assert.ok(fakeSelect.calledWith('*'));
        assert.strictEqual(fakeWhere.callCount, 1);
        assert.ok(fakeWhere.calledWith('user_name', '=', 'sukhi'));
      }
    });
  });
});
