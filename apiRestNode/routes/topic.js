'use strict'

const express = require('express');
const TopicController = require('../controllers/topic');

const router = express.Router();
const mAuth = require('../middlewares/auth');

/*const multipart = require('connect-multiparty');
const mUpload = multipart({uploadDir: './uploads/users'});*/

router.post('/topic', mAuth.auth, TopicController.save);
router.get('/topics/:page?', TopicController.getTopics);
router.get('/topics-user/:user', TopicController.getTopicsByUser);
router.get('/topic/:id', TopicController.getTopic);

module.exports = router;