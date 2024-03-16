const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models/models');

// User routes
router.post('/users', async (req, res) => {
  const { username, email, password, bio } = req.body;
  try {
    const userId = await User.createUser(username, email, password, bio);
    res.json({ id: userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, bio } = req.body;
  try {
    await User.updateUser(id, username, email, password, bio);
    res.json({ message: `User ${id} updated successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteUser(id);
    res.json({ message: `User ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post routes
router.post('/posts', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const postId = await Post.createPost(title, content, userId);
    res.json({ id: postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await Post.updatePost(id, title, content);
    res.json({ message: `Post ${id} updated successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deletePost(id);
    res.json({ message: `Post ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment routes
router.post('/comments', async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const commentId = await Comment.createComment(content, postId, userId);
    res.json({ id: commentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.getComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    await Comment.updateComment(id, content);
    res.json({ message: `Comment ${id} updated successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.deleteComment(id);
    res.json({ message: `Comment ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;