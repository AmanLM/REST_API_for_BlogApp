const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.use('/api/auth',require('./auth'));
router.use('/api/users',require('./users'));
router.use('/api/blog',require('./blogs'));

module.exports = router;