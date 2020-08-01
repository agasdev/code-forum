'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/register', UserController.save);

module.exports = router;