const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envPath });

const knex = require('./knexfile');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL, {
  db: process.env.DB,
});

const Sessions = require('./src/sessions');
const Database = require('./src/database');

const authMiddleware = require('./src/middleware/authorizeUser');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const PostRouter = require('./src/routes/posts');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.locals.sessions = new Sessions(client);
app.locals.db = new Database(knex);

app.use('/api/auth', authRouter);
app.use('/api/*', authMiddleware);
app.use('/api/user', userRouter);
app.use('/api/post', PostRouter);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
