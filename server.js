const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const redis = require('redis');
const REDIS_URL = 'redis://localhost:6379';
const client = redis.createClient(process.env.REDIS_URL || REDIS_URL);

const SessionsStore = require('./lib/sessionsStore');
const PostsStore = require('./src/postsStore');

const authMiddleware = require('./src/middleware/authorizeUser');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const PostRouter = require('./src/routes/posts');

const PORT = process.env.PORT || process.argv[2] || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

client.get('sessionsStore', (err, data) => {
  const sessions = JSON.parse(data) || [];
  app.locals.sessionsStore = new SessionsStore(sessions);
});
client.get('postsStore', (err, data) => {
  const posts = JSON.parse(data) || [];
  app.locals.postsStore = new PostsStore(posts);
});

app.use((req, res, next) => {
  req.redisClient = client;
  next();
});
app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/user', userRouter);
app.use('/post', PostRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
