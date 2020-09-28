const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sessions = req.app.locals.sessions;
  const { user_name } = sessions.getSession(req.cookies.id);
  const user = req.app.locals.db.getUser(user_name);
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
  const sessions = req.app.locals.sessions;
  sessions.deleteSession(req.cookies.id);
  res.clearCookie('id');
  req.app.locals.redisClient.set('sessions', sessions.toJSON());
  res.json({ isLoggedIn: false });
});

module.exports = router;
