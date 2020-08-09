'use strict'

const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');

const save = (req, res) => {
    // Get request parameters
    const params = req.body;

    // Validate data
    try {
        const validate_name = !validator.isEmpty(params.name);
        const validate_surname = !validator.isEmpty(params.surname);
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = !validator.isEmpty(params.password);

        if (!(validate_name && validate_surname && validate_email && validate_password)) {
            return res.status(400).send({
                status: "error",
                message: "Invalid data"
            });
        }
    } catch (err) {
        return res.status(404).send({
            status: "error",
            message: "Data error"
        });
    }

    // Create user object and assign values
    let user = new User();
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = null;

    // Check user exist
    User.findOne({email: user.email}, (err, issetUser) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error from DB"
            });
        } else if (issetUser) {
            return res.status(400).send({
                status: "error",
                message: "User already exist"
            });
        } else {
            // Hash password
            bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;
            });

            // Save user
            user.save((err, userStored) => {
                if (err || !userStored) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error saving user"
                    });
                }
                return res.status(200).send({
                    status: "Success",
                    user: user
                });
            });
        }
    });
}

const login = (req, res) => {
    // Get parameters
    const params = req.body;

    // Validate data
    try {
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = !validator.isEmpty(params.password);

        if (!validate_email || !validate_password) {
            return res.status(400).send({
                status: "error",
                message: "Invalid data"
            });
        }
    } catch (err) {
        return res.status(404).send({
            status: "error",
            message: "Data error"
        });
    }

    // Search user
    User.findOne({email: params.email.toLowerCase()}, (err, user) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error retrieving user from DB"
            });
        }
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }

        // Check password
        bcrypt.compare(params.password, user.password, (err, check) => {
            if (err || !check) {
                return res.status(400).send({
                    status: "error",
                    message: "Incorrect password"
                });
            }

            // Create token
            if (params.getToken) {
                return res.status(200).send({
                    status: "success",
                    token: jwt.createToken(user)
                });
            }

            // Send data
            user.password = undefined;
            return res.status(200).send({
                status: "success",
                user
            });
        });
    });

}

const update = (req, res) => {
    const params = req.body;

    try {
        const validate_name = !validator.isEmpty(params.name);
        const validate_surname = !validator.isEmpty(params.surname);
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        if (!(validate_name && validate_surname && validate_email)) {
            return res.status(400).send({
                status: "error",
                message: "Invalid data"
            });
        }
    } catch (err) {
        return res.status(404).send({
            status: "error",
            message: "Data error"
        });
    }

    delete params.password;

    const userId = req.user.sub;

    User.findOne({email: params.email.toLowerCase()}, (err, user) => {
        if (err) {
            return res.status(500).send({
                status: "error",
                message: "Error retrieving user from DB"
            });
        } else if (user && req.user.email !== params.email) {
            return res.status(404).send({
                status: "error",
                message: "Email is already in use"
            });
        } else {
            User.findOneAndUpdate({_id: userId}, params, {new: true}, (err, userUpdated) => {
                if (err || !userUpdated) {
                    return res.status(400).send({
                        status: "error",
                        message: "Update error"
                    });
                }
                return res.status(200).send({
                    status: "success",
                    user: userUpdated
                });
            });
        }
    });
}

const uploadAvatar = (req, res) => {
    // Get file
    if (!req.files.file0) {
        return res.status(400).send({
            status: "error",
            message: "Avatar not uploaded"
        });
    }

    // Get info file
    const file_path = req.files.file0.path;
    const file_split = file_path.split('/');
    const file_name = file_split.pop();
    const ext_split = file_name.split('.');
    const file_ext = ext_split.pop();

    // Check extension
    if (file_ext !== 'png' && file_ext !== 'jpg' && file_ext !== 'jpeg' && file_ext !== 'gif') {
        fs.unlink(file_path, () => {
            return res.status(403).send({
                status: "error",
                message: "File not allowed"
            });
        });

    } else {
        console.log(req.user.sub);
        // Check user id
        const userId = req.user.sub;

        // Update user
        User.findOneAndUpdate({_id: userId}, {image: file_name}, {new: true}, (err, userUpdate) => {
            if (err || !userUpdate) {
                return res.status(500).send({
                    status: "error",
                    message: "Error updating user"
                });
            }
            return res.status(200).send({
                status: "success",
                user: userUpdate
            });
        });
    }
}

const avatar = (req, res) => {
    const file_name = req.params.fileName;
    const path_file = `./uploads/users/${file_name}`;

    if (!fs.existsSync(path_file)) {
        return res.status(404).send({
            status: "error",
            message: "Image not found"
        });
    }

    return res.sendFile(path.resolve(path_file));
}

const getUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(404).send({
                status: "error",
                message: "Not users found"
            })
        }

        return res.status(200).send({
            status: "success",
            users
        });
    });
}

const getUser = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(404).send({
                status: "error",
                message: "Not user found"
            })
        }

        return res.status(200).send({
            status: "success",
            user
        });
    });
}

module.exports = {
    save,
    login,
    update,
    uploadAvatar,
    avatar,
    getUsers,
    getUser
};