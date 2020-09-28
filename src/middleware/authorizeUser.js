const authorizeUser = function (req, res, next) {
  const sessions = req.app.locals.sessions;
  const session = sessions.getSession(req.cookies.id);
  if (!session) {
    res.sendStatus(401);
    res.end();
    return;
  }
  next();
};

module.exports = authorizeUser;
