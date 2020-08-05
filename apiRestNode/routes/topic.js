'use strict'

const express = require('express');
const TopicController = require('../controllers/topic');

const router = express.Router();
const mAuth = require('../middlewares/auth');

router.post('/topic', mAuth.auth, TopicController.save);
router.get('/topics/:page?', TopicController.getTopics);
router.get('/topics-user/:user', TopicController.getTopicsByUser);
router.get('/topic/:id', TopicController.getTopic);
router.put('/topic/:id', mAuth.auth, TopicController.update);
router.delete('/topic/:id', mAuth.auth, TopicController.deleteTopic);

module.exports = router;