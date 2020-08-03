'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "SECRET_KEY_TOKEN";

const auth = (req, res, next) => {
    // Check header authorization
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'Security error'
        });
    }

    // Clear token
    const token = req.headers.authorization.replace(/['"]+/g, '');

    // Token decode
    try {
        let payload = jwt.decode(token, secret);

        // Check expire time token
        if (payload.exp <= moment.unix) {
            return res.status(404).send({
                message: 'Expired token'
            });
        }

        req.user = payload;
    } catch (exception) {
        return res.status(404).send({
            message: 'Token not valid'
        });
    }

    next();
}

module.exports = {
    auth
}