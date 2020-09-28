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
  const client = req.app.locals.redisClient;
  const code = req.query.code;
  getGithubAccessToken(code)
    .then(getUserDetailsByAccessToken)
    .then(({ data, accessToken }) => {
      const githubUser = {
        user_name: data.login,
        img_url: data.avatar_url,
        bio: data.bio,
      };
      req.app.locals.db
        .getUser(githubUser.user_name)
        .then(([user]) => {
          if (user) return Promise.resolve(user.user_id);
          else return req.app.locals.db.saveUser(githubUser);
        })
        .then(user_id => {
          const sessionId = sessionsStore.createNewSession({
            accessToken,
            user_name: githubUser.user_name,
            user_id,
          });
          res.cookie('id', sessionId);
          client.set('sessionsStore', sessionsStore.toJSON());
          res.redirect(process.env.LOGIN_REDIRECT);
        });
    });
});

module.exports = router;
