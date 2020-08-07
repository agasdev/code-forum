'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    app.set('port', port);
    console.log('Mongoose is conected');

    const server = app.listen(port, () => {
        console.log("Server run in " + server.address().port);
    });
});
