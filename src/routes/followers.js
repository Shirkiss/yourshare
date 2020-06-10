const {Followers} = require('../modules/followers');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/add-follower', async (req, res) => {
    let followers = new Followers(_.pick(req.body, ['userId', 'followingUserId']));
    await followers.save();
    res.send(followers);
});

module.exports = router;