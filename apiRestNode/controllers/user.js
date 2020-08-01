'use strict'

const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

const save = (req, res) => {
    // Get request parameters
    const params = req.body;

    // Validate data
    const validate_name = !validator.isEmpty(params.name);
    const validate_surname = !validator.isEmpty(params.surname);
    const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
    const validate_password = !validator.isEmpty(params.password);

    if (validate_name && validate_surname && validate_email && validate_password) {
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
                    message: "Error al comprobar duplicidad de usuario"
                });
            } else if (issetUser) {
                return res.status(500).send({
                    message: "El usuario ya existe"
                });
            } else {
                // Hash password
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                });

                // Guardar usuario
                user.save((err, userStored) => {
                    if (err || !userStored) {
                        return res.status(500).send({
                            message: "Error al guardar el usuario"
                        });
                    }
                    return res.status(200).send({
                        status: "Success",
                        user: user
                    });
                });
            }
        });
    } else {
        return res.status(400).send({
            message: "Los datos no son válidos"
        });
    }
}

module.exports = {
    save
};