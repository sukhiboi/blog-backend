const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.app.locals.sessions.getSession(req.cookies.id).then(({ user_name }) => {
    req.app.locals.db.getUser(user_name).then(([user]) => {
      res.json({ ...user, isLoggedIn: true });
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
