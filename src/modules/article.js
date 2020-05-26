const mongoose = require('mongoose');

const Article = mongoose.model('Article', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    upvotes: {
        type: Number,
    },
    comments: {
        type: Array,
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
}));


exports.Article = Article;