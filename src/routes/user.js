const express = require('express');
const router = express.Router();

const { getUserDetailsByAccessToken } = require('./../auth/github.auth');

router.get('/', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  const session = sessionsStore.getSession(req.cookies.id);
  getUserDetailsByAccessToken(session.accessToken).then(data => res.json(data));
});

router.get('/logout', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  sessionsStore.deleteSession(req.cookies.id);
  res.clearCookie('id');
  res.redirect(process.env.LOGIN_REDIRECT);
});

module.exports = router;
