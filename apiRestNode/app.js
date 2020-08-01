'use strict'

// Requires
const express = require('express');
const bodyParser = require('body-parser');

// Express
const app = express();

// Cargar rutas
const userRoutes = require('./routes/user');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Reescribir rutas
app.use('/api', userRoutes);

// Exportar módulo
module.exports = app;