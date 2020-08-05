'use strict'

const validator = require('validator');
const Topic = require('../models/topic');

const save = (req, res) => {
    // Get parameters
    const params = req.body;

    // Validate data
    try {
        const validate_title = !validator.isEmpty(params.title);
        const validate_content = !validator.isEmpty(params.content);
        const validate_lang = !validator.isEmpty(params.lang);

        if (!(validate_title && validate_content && validate_lang)) {
            return res.status(400).send({
                status: "error",
                message: "Invalid data"
            });
        }
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Data error"
        })
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
            topicStore
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
        sort: { date: -1 },
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

       if (topics.length === 0) {
           return res.status(404).send({
               status: "error",
               message: "No topics found"
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

module.exports = {
    save,
    getTopics,
    getTopicsByUser,
    getTopic
}