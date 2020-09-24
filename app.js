const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envPath });

const redis = require('redis');
const REDIS_URL = 'redis://localhost:6379';
const client = redis.createClient(process.env.REDIS_URL || REDIS_URL, {
  db: process.env.DB,
});

const SessionsStore = require('./lib/sessionsStore');
const PostsStore = require('./src/postsStore');
const UsersStore = require('./src/usersStore');

const authMiddleware = require('./src/middleware/authorizeUser');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const PostRouter = require('./src/routes/posts');

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
client.get('usersStore', (err, data) => {
  const users = JSON.parse(data) || [];
  app.locals.usersStore = new UsersStore(users);
});

app.use((req, res, next) => {
  req.redisClient = client;
  next();
});
app.use('/api/auth', authRouter);
app.use('/api/*', authMiddleware);
app.use('/api/user', userRouter);
app.use('/api/post', PostRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
