const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
const profileRoutes = require('./api/profile');
const postsRoutes = require('./api/posts');

router.use('/api/users', userRoutes);

router.use('/api/profile', profileRoutes);

router.use('/api/posts', postsRoutes);

module.exports = router;