const authorizeUser = (req, res, next) => {
  req.app.locals.sessions.getSession(req.cookies.id).then(session => {
    if (session) {
      next();
      return;
    }
    res.sendStatus(401);
    res.end();
  });
};

module.exports = authorizeUser;
