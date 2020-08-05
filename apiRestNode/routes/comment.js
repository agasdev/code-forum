'use strict'

const express = require('express');
const CommentController = require('../controllers/comment');

const router = express.Router();
const mAuth = require('../middlewares/auth');

router.post('/comment/topic/:topicId', mAuth.auth, CommentController.add);
router.put('/comment/:id', mAuth.auth, CommentController.update);
router.delete('/comment/:topicId/:id', mAuth.auth, CommentController.deleteComment);

module.exports = router;