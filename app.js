require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/config.js');
const logger = require('morgan');
const mongoose = require('mongoose');

const router = require('./routes/routes.js');


const PORT = config.PORT;

const mode = process.env.NODE_ENV || 'development';

mongoose.connect( config.MONGO_DB_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, () => {
    console.log('DB Connected...');
})

if (mode) {
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`);
})