const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  const { user } = sessionsStore.getSession(req.cookies.id);
  res.json({ ...user, isLoggedIn: true });
});

router.get('/logout', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  sessionsStore.deleteSession(req.cookies.id);
  res.clearCookie('id');
  req.redisClient.set('sessionsStore', sessionsStore.toJSON());
  res.json({ isLoggedIn: false });
});

module.exports = router;
