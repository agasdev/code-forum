'use strict'

const express = require('express');
const TopicController = require('../controllers/topic');

const router = express.Router();
const mAuth = require('../middlewares/auth');

/*const multipart = require('connect-multiparty');
const mUpload = multipart({uploadDir: './uploads/users'});*/

router.post('/topic', mAuth.auth, TopicController.save);

module.exports = router;