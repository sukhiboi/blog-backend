const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envPath });

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
});

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL, {
  db: process.env.DB,
});

const SessionsStore = require('./lib/sessionsStore');

const authMiddleware = require('./src/middleware/authorizeUser');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const PostRouter = require('./src/routes/posts');
const Database = require('./src/database');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.locals.redisClient = client;
app.locals.db = new Database(knex);

client.get('sessions', (err, data) => {
  const sessions = JSON.parse(data) || [];
  app.locals.sessions = new SessionsStore(sessions);
});

app.use('/api/auth', authRouter);
app.use('/api/*', authMiddleware);
app.use('/api/user', userRouter);
app.use('/api/post', PostRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
