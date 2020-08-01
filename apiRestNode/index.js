'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true })
        .then(() => {
            console.log('La conexión a la base de datos mongo se ha realizado correctamente');

            // Crear servidor
            app.listen(port, () => {
                console.log("Server run in http://localhost:3000");
            });
        })
    .catch(error => console.log(error));