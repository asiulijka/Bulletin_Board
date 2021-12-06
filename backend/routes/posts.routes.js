const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('email published title photo')
      .sort({published: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/user/:email/posts', async (req, res) => {
  try {
    const result = await Post
      .find({email: req.params.email})
      .select('email published title photo status')
      .sort({published: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { 
      title, description, published, actualised, email, 
      status, photo, price, phone, location } = req.body;

    // Validations
    title.length < 10 ? res.status(500).json("too short title") : null;
    description.length < 20 ? res.status(500).json("too short description") : null;
    !(/(.+)@(.+){2,}\.(.+){2,}/.test(email)) ? res.status(500).json("email format incorrect") : null;

    // DB operations
    const newPost = new Post(
      { title: sanitize(title), 
        description: sanitize(description), 
        published: sanitize(published), 
        actualised: sanitize(actualised), 
        email: sanitize(email), 
        status: sanitize(status), 
        photo: sanitize(photo), 
        price: sanitize(price), 
        phone: sanitize(phone), 
        location: sanitize(location) });
    const savedNewPost = await newPost.save();

    // Response
    res.json({ newPost: savedNewPost });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts', async (req, res) => {
  try {
    const { 
      _id, title, description, published, actualised, email, 
      status, photo, price, phone, location } = req.body;

    // Validations
    title.length < 10 ? res.status(500).json("too short title") : null;
    description.length < 20 ? res.status(500).json("too short description") : null;
    !(/(.+)@(.+){2,}\.(.+){2,}/.test(email)) ? res.status(500).json("email format incorrect") : null;

    // DB operations
    const updatedPost = await Post.findOneAndUpdate(
      {_id: _id}, 
      { title: sanitize(title), 
        description: sanitize(description), 
        published: sanitize(published), 
        actualised: sanitize(actualised), 
        email: sanitize(email), 
        status: sanitize(status), 
        photo: sanitize(photo), 
        price: sanitize(price), 
        phone: sanitize(phone), 
        location: sanitize(location) }, 
      { new: true });

    // Response
    res.json({ updatedPost: updatedPost });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
