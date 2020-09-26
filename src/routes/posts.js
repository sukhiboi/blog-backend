const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  res.json(postsStore.getAllPosts(req.user.name));
});

router.get('/:id', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  res.json(postsStore.getPost(req.params.id, req.user.name));
});

router.post('/add-new-post', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  const id = postsStore.addNewPost({ ...req.body, name: req.user.name });
  res.send(`Added post - id${id}`);
  req.app.locals.redisClient.set('postsStore', postsStore.toJSON());
});

router.post('/delete-post', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  const { id } = postsStore.deletePost(req.body.id);
  res.send(`Deleted post - id${id}`);
  req.app.locals.redisClient.set('postsStore', postsStore.toJSON());
});

module.exports = router;
