import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/your-share')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/auth', auth);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));