const { User, validate } = require('../modules/user');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send({message: 'That user already exists!'});
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // Check if this user already exists
    let user = await User.findOne({ email: email });
    if (user) {
        if (user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(500).json({message: 'Invalid password'});
        }
    } else {
        res.status(500).json({message: 'Invalid user'});
    }
});

module.exports = router;