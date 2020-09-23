const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  res.json(postsStore.getAllPosts());
});

router.get('/:id', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  res.json(postsStore.getPost(req.params.id));
});

router.post('/add-new-post', (req, res) => {
  const postsStore = req.app.locals.postsStore;
  const sessionsStore = req.app.locals.sessionsStore;
  const { user } = sessionsStore.getSession(req.cookies.id);
  const id = postsStore.addNewPost({ ...req.body, name: user.name });
  res.send(`Added post - id${id}`);
  req.redisClient.set('postsStore', postsStore.toJSON());
});

module.exports = router;
