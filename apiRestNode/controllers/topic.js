'use strict'

const validator = require('validator');
const Topic = require('../models/topic');

const save = (req, res) => {
    // Get parameters
    const params = req.body;
    const validate = validateData(params);

    if (!validate.isValid) {
        return res.status(validate.code).send({
            status: "error",
            message: validate.message
        });
    }

    // Create topic object
    let topic = new Topic();
    topic.title = params.title;
    topic.content = params.content;
    topic.code = params.code;
    topic.lang = params.lang;
    topic.user = req.user.sub;

    // Save topic
    topic.save((err, topicStore) => {
        if (err || !topicStore) {
            return res.status(500).send({
                status: "error",
                message: "Error saving topic"
            });
        }

        return res.status(200).send({
            status: "success",
            topic: topicStore
        });
    });
}

const getTopics = (req, res) => {
    // Get actual page
    let page = parseInt(req.params.page);
    console.log(page);
    if (!page || page === 0) {
        page = 1;
    }

    // Paginate options
    const options = {
        sort: {date: -1},
        populate: 'user',
        limit: 5,
        page: page
    }

    // Find with pagination
    Topic.paginate({}, options, (err, topics) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error retrieving topics from DB"
            });
        }

        if (topics.docs.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No topics found"
            });
        }

        return res.status(200).send({
            status: "success",
            topics: topics.docs,
            totalDocs: topics.totalDocs,
            totalPages: topics.totalPages
        });
    });
}

const getTopicsByUser = (req, res) => {
    // Get user id
    const userId = req.params.user;

    // Find user topics
    Topic.find({user: userId}).sort([['date', 'descending']]).exec((err, topics) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error retrieving topics from DB"
            });
        }

        return res.status(200).send({
            status: "success",
            topics
        })
    });
}

const getTopic = (req, res) => {
    // Get topic id
    const topicId = req.params.id;

    // Find topic
    Topic.findById(topicId).populate('user').exec((err, topic) => {
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
}

const update = (req, res) => {
    const topicId = req.params.id;
    const params = req.body;
    const validate = validateData(params);

    if (!validate.isValid) {
        return res.status(validate.code).send({
            status: "error",
            message: validate.message
        });
    }

    const update = {
        title: params.title,
        content: params.content,
        code: params.code,
        lang: params.lang
    }

    Topic.findOneAndUpdate({
        _id: topicId,
        user: req.user.sub
    }, update, {new: true}).populate('user').exec((err, topicUpdated) => {
        if (err || !topicUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error updating topic"
            });
        }

        return res.status(200).send({
            status: "success",
            topic: topicUpdated
        });
    });
}

const deleteTopic = (req, res) => {
    const topicId = req.params.id;

    Topic.findOneAndDelete({_id: topicId, user: req.user.sub}).populate('user').exec((err, topicRemove) => {
        if (err || !topicRemove) {
            return res.status(500).send({
                status: "error",
                message: "Error removing topic"
            });
        }

        return res.status(200).send({
            status: "success",
            topic: topicRemove
        });
    });
}

const search = (req, res) => {
    const search = req.params.search;

    Topic.find({
        "$or": [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"code": {"$regex": search, "$options": "i"}},
            {"lang": {"$regex": search, "$options": "i"}},
        ]
    }).sort([["date", "descending"]]).exec((err, topics) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error retrieving topics from DB"
            });
        }

        return res.status(200).send({
            status: "success",
            topics
        });
    });
}

const validateData = (params) => {
    let validate = {isValid: true, code: 200};
    try {
        const validate_title = !validator.isEmpty(params.title);
        const validate_content = !validator.isEmpty(params.content);
        const validate_lang = !validator.isEmpty(params.lang);

        if (!(validate_title && validate_content && validate_lang)) {
            validate = {isValid: false, message: "Invalid data", code: 400};
        }
    } catch (err) {
        validate = {isValid: false, message: "Data error", code: 500};
    }

    return validate;
}

module.exports = {
    save,
    getTopics,
    getTopicsByUser,
    getTopic,
    update,
    deleteTopic,
    search
}