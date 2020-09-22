const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const SessionsStore = require('./lib/sessionsStore');
const authMiddleware = require('./src/middleware/authorizeUser');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const PostRouter = require('./src/routes/posts');

const PORT = process.env.PORT || process.argv[2] || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(morgan('dev'));

app.locals.sessionsStore = new SessionsStore();
app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/user', userRouter);
app.use('/post', PostRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
