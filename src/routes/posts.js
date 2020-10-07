const express = require('express');
const router = express.Router();

router.post('/all', (req, res) => {
  const searchPhrase = req.body.search || '';
  req.app.locals.db.getAllPosts(searchPhrase).then(data => res.json(data));
});

router.get('/:id', (req, res) => {
  req.app.locals.db.getPost(req.params.id).then(([data]) => res.json(data));
});

router.post('/add-new-post', (req, res) => {
  req.app.locals.sessions.getSession(req.cookies.id).then(({ user_id }) => {
    req.app.locals.db.savePost({ ...req.body, user_id }).then(() => res.end());
  });
});

router.post('/update-post', (req, res) => {
  req.app.locals.db
    .updatePost(req.body.id, req.body.updatedPost)
    .then(() => res.end());
});

router.post('/delete-post', (req, res) => {
  req.app.locals.db.deletePost(req.body.id).then(() => res.end());
});

module.exports = router;
