'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();
const mAuth = require('../middlewares/auth');

const multipart = require('connect-multiparty');
const mUpload = multipart({uploadDir: './uploads/users'});

router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', mAuth.auth, UserController.update);
router.post('/upload-avatar', [mAuth.auth, mUpload], UserController.uploadAvatar);
router.get('/avatar/:fileName', UserController.avatar);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);

module.exports = router;