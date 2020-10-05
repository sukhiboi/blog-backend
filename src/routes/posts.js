const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  req.app.locals.db.getAllPosts().then(data => res.json(data));
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
    .updatePost(req.body.updatedPost, req.body.id)
    .then(() => res.end());
});

router.post('/delete-post', (req, res) => {
  req.app.locals.db.deletePost(req.body.id).then(() => res.end());
});

module.exports = router;
