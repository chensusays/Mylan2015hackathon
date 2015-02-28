var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  user: String,
  score: Number
});

module.exports = mongoose.model('Score', ScoreSchema);
