const express = require('express');
const router = express.Router();

const {
  authorizeUser,
  getGithubAccessToken,
  getUserDetailsByAccessToken,
} = require('./../auth/github.auth');

router.get('/login', authorizeUser);

router.get('/callback', (req, res) => {
  const sessionsStore = req.app.locals.sessionsStore;
  const usersStore = req.app.locals.usersStore;
  const code = req.query.code;
  getGithubAccessToken(code)
    .then(getUserDetailsByAccessToken)
    .then(({ data, accessToken }) => {
      const user = { name: data.name, imgURL: data.avatar_url, bio: data.bio };
      res.cookie('id', sessionsStore.createNewSession({ accessToken, user }));
      usersStore.addNewUser(user);
      req.redisClient.set('sessionsStore', sessionsStore.toJSON());
      req.redisClient.set('usersStore', usersStore.toJSON());
      res.redirect(process.env.LOGIN_REDIRECT);
    });
});

module.exports = router;
