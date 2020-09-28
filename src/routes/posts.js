const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  req.app.locals.db.getAllPosts().then(data => res.json(data));
});

router.get('/:id', (req, res) => {
  req.app.locals.db.getPost(req.params.id).then(([data]) => res.json(data));
});

router.post('/add-new-post', (req, res) => {
  const { user_id } = req.app.locals.sessionsStore.getSession(req.cookies.id);
  req.app.locals.db
    .savePost({ ...req.body, user_id })
    .then(res.send('Added new post'));
});

router.post('/delete-post', (req, res) => {
  req.app.locals.db.deletePost(req.params.id).then(console.log);
});

module.exports = router;
