const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  title: String,
  subTitle: String,
  body: String
})

Post.index({title: 'text'})

const post = mongoose.model('Post', Post);

module.exports = post;