const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const session = await req.app.locals.sessions.getSession(req.cookies.id);
  const user = await req.app.locals.db.getUser(session.user_name);
  res.json({ ...user, isLoggedIn: true });
});

router.get('/profile/:username', (req, res) => {
  req.app.locals.db.getUser(req.params.username).then(user => {
    req.app.locals.db.getUserPosts(user.user_id).then(posts => {
      res.json({ user, posts });
    });
  });
});

router.get('/logout', (req, res) => {
  req.app.locals.sessions.deleteSession(req.cookies.id).then(() => {
    res.clearCookie('id');
    res.json({ isLoggedIn: false });
  });
});

module.exports = router;
