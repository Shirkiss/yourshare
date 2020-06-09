const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../modules/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({message: error.details[0].message});
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({message: 'Incorrect email or password.'});
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({message: 'Incorrect email or password.'});
    }
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.send({token: token});
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
