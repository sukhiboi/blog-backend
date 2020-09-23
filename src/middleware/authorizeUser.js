const authorizeUser = function (req, res, next) {
  const sessionsStore = req.app.locals.sessionsStore;
  const session = sessionsStore.getSession(req.cookies.id);
  if (!session) {
    res.sendStatus(401);
    res.end();
    return;
  }
  req.user = session.user;
  next();
};

module.exports = authorizeUser;
