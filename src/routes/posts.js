const express = require('express');

const posts = [
  {
    id: 1,
    title: 'A brand new Post',
    publishedDate: '2020-09-11T15:57:14.580Z',
    content: 'Hello this is some dummy content.',
  },
  {
    id: 2,
    title: 'A second brand new Post',
    publishedDate: '2020-03-11T15:57:14.580Z',
    content: 'Hello this is again some dummy content.',
  },
];

const router = express.Router();

router.get('/all', (req, res) => res.json(posts));

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(posts.find(post => post.id === +id));
});

module.exports = router