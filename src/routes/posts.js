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
  const id = postsStore.addNewPost(req.body);
  res.send(`Added post - id${id}`);
});

module.exports = router;
