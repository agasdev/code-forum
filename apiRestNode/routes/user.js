'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();
const mAuth = require('../middlewares/auth');

router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', mAuth.auth, UserController.update);

module.exports = router;