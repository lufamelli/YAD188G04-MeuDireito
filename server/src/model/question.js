const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  questionTitle: String,
  description: String,
})

Question.index({question: 'text'})

const question = mongoose.model('Question', Question);

module.exports = question;