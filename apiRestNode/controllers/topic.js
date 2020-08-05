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

module.exports = {
    save
}