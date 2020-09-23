const axios = require('axios');

const getGithubAccessToken = async function (code) {
  const OAuthDetails = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };
  const headers = { headers: { accept: 'application/json' } };
  const url = 'https://github.com/login/oauth/access_token';
  return axios
    .post(url, OAuthDetails, headers)
    .then(({ data }) => data.access_token);
};

const getUserDetailsByAccessToken = function (accessToken) {
  const options = { headers: { Authorization: `token ${accessToken}` } };
  return axios
    .get('https://api.github.com/user', options)
    .then(({ data }) => ({ accessToken, data }));
};

const authorizeUser = function (request, response) {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
  response.redirect(url);
};

module.exports = {
  authorizeUser,
  getUserDetailsByAccessToken,
  getGithubAccessToken,
};
