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
  const code = req.query.code;

  const accessToken = await getGithubAccessToken(code);
  const { data } = await getUserDetailsByAccessToken(accessToken);

  const githubUser = {
    user_name: data.login,
    img_url: data.avatar_url,
    bio: data.bio,
  };

  const user_id = await db.getUser(data.login).then(([user]) => {
    if (!user) {
      const savedUserDetails = await db.saveUser(githubUser);
      return Promise.resolve(savedUserDetails[0].user_id);  
    }
    return Promise.resolve(user.user_id);
  });

  await sessions.createSession({
    accessToken,
    user_name: data.login,
    user_id,
  });

  res.cookie('id', user_id);
  res.redirect(process.env.LOGIN_REDIRECT);
});

module.exports = router;
