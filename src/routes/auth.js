const express = require('express');
const router = express.Router();

const {
  authorizeUser,
  getGithubAccessToken,
  getUserDetailsByAccessToken,
} = require('./../auth/github.auth');

router.get('/login', authorizeUser);

router.get('/callback', async (req, res) => {
  const sessions = req.app.locals.sessions;
  const db = req.app.locals.db;
  const client = req.app.locals.redisClient;
  const code = req.query.code;

  const accessToken = await getGithubAccessToken(code);
  const { data } = await getUserDetailsByAccessToken(accessToken);
  const githubUser = {
    user_name: data.login,
    img_url: data.avatar_url,
    bio: data.bio,
  };
  const user_id = await db.getUser(data.login).then(([user]) => {
    if (!user) return db.saveUser(githubUser);
    return Promise.resolve(user.user_id);
  });
  const sId = sessions.createNewSession({
    accessToken,
    user_name: data.login,
    user_id,
  });
  res.cookie('id', sId);
  client.set('sessions', sessions.toJSON());
  res.redirect(process.env.LOGIN_REDIRECT);
});

module.exports = router;
