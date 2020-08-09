'use strict'

const Topic = require('../models/topic');
const validator = require('validator');

const add = (req, res) => {
    const topicId = req.params.topicId;
    const params = req.body;

    Topic.findById(topicId).exec((err, topic) => {
        if (err || !topic) {
            return res.status(404).send({
                status: "error",
                message: "No topic found"
            });
        }

        try {
            const validate_content = !validator.isEmpty(params.content);

            if (!validate_content) {
                return res.status(400).send({
                    status: "error",
                    message: "Invalid data"
                });
            }
        } catch (err) {
            return res.status(500).send({
                status: "error",
                message: "Data error"
            });
        }

        const comment = {
            user: req.user.sub,
            content: params.content,
        }

        topic.comments.push(comment);

        topic.save((err) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error saving comment"
                });
            }

            Topic.findById(topic._id).populate('user').populate('comments.user').exec((err, topic) => {
                if (err || !topic) {
                    return res.status(404).send({
                        status: "error",
                        message: "No topic found"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    topic
                })
            });
        })
    });
}

const update = (req, res) => {
    const commentId = req.params.id;
    const params = req.body;

    try {
        const validate_content = !validator.isEmpty(params.content);

        if (!validate_content) {
            return res.status(400).send({
                status: "error",
                message: "Invalid data"
            });
        }
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Data error"
        });
    }

    Topic.findOneAndUpdate({'comments._id': commentId}, {'$set': {'comments.$.content': params.content}}, {new: true}, (err, topicUpdated) => {
        if (err || !topicUpdated) {
            return res.status(404).send({
                status: "error",
                message: "Error updating comment"
            });
        }

        return res.status(200).send({
            status: "success",
            topic: topicUpdated
        });
    });
}

const deleteComment = (req, res) => {
    const topicId = req.params.topicId;
    const commentId = req.params.id;

    Topic.findById(topicId, (err, topic) => {
        console.log(topic);
        if (err || !topic) {
            return res.status(404).send({
                status: "error",
                message: "Topic not found"
            });
        }

        const comment = topic.comments.id(commentId);

        if (!comment) {
            return res.status(404).send({
                status: "error",
                message: "Comment not found"
            });
        } else {
            comment.remove();

            topic.save((err) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error saving topic"
                    });
                }

                Topic.findById(topic._id).populate('user').populate('comments.user').exec((err, topic) => {
                    if (err || !topic) {
                        return res.status(404).send({
                            status: "error",
                            message: "No topic found"
                        });
                    }

                    return res.status(200).send({
                        status: "success",
                        topic
                    })
                });
            });
        }
    });
}

module.exports = {
    add,
    update,
    deleteComment
}