const { Article } = require('../modules/article');
const express = require('express');
const router = express.Router();

router.post('/add-article', async (req, res) => {
    // Check if this user already exists
    let article = await Article.findOne({ name: req.body.name });
    if (article) {
        return res.status(400).send('That name already exists!');
    } else {
        // Insert the new user if they do not exist yet
        article = new Article({
            name: req.body.name,
            comments: [],
            upvotes: 0
        });
        await article.save();
        res.send(article);
    }
});

router.get('/:name', async (req, res) => {
    let article = await Article.findOne({ name: req.params.name });
    if (article) {
        return res.status(200).send(article);
    } else {
        return res.status(400).send('Article with this name doesnot exists!');
    }
});

router.post('/:name/upvote', async (req, res) => {
    let article = await Article.findOne({ name: req.params.name });
    if (article) {
        article.upvotes = article.upvotes + 1;
        await article.save();
        return res.status(200).send(article);
    } else {
        return res.status(400).send('Article with this name doesnot exists!');
    }
});

router.post('/:name/add-comment', async (req, res) => {
    const {username, text} = req.body;
    let article = await Article.findOne({ name: req.params.name });
    if (article) {
        article.comments = article.comments.concat({username, text});
        await article.save();
        return res.status(200).send(article);
    } else {
        return res.status(400).send('Article with this name doesnot exists!');
    }
});


module.exports = router;