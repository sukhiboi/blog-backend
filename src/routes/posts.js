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

module.exports = router;
