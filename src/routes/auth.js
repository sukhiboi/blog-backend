const express = require('express');
const router = express.Router();

const {
  authorizeUser,
  getGithubAccessToken,
} = require('./../auth/github.auth');

router.get('/login', authorizeUser);

router.get('/callback', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  const code = req.query.code;
  getGithubAccessToken(code).then(token => {
    console.log(token);
    res.cookie('id', sessionsStore.createNewSession(token));
    req.redisClient.set('sessionsStore', sessionsStore.toJSON());
    res.redirect(process.env.LOGIN_REDIRECT);
  });
});

module.exports = router;
