const authorizeUser = async (req, res, next) => {
  try {
    await req.app.locals.sessions.getSession(req.cookies.id);
    next();
  } catch {
    res.sendStatus(401);
    res.end();
    return;
  }
};

module.exports = authorizeUser;
