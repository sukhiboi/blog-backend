const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  const { user } = sessionsStore.getSession(req.cookies.id);
  res.json({ ...user, isLoggedIn: true });
});

router.get('/profile/:username', (req, res) => {
  const usersStore = req.app.locals.usersStore;
  const postsStore = req.app.locals.postsStore;
  const user = usersStore.getUser(req.params.username);
  const posts = postsStore.getUserPosts(req.params.username);
  res.json({ user, posts });
});

router.get('/logout', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  sessionsStore.deleteSession(req.cookies.id);
  res.clearCookie('id');
  req.app.locals.redisClient.set('sessionsStore', sessionsStore.toJSON());
  res.json({ isLoggedIn: false });
});

module.exports = router;
