import express from 'express';
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
import bodyParser from 'body-parser';
import path from 'path';
const users = require('./routes/users');
const articles = require('./routes/articles');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/your-share')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/articles', articles);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));