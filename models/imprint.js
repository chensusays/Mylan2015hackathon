var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  manufacturer: String,
  score: Number
});

module.exports = mongoose.model('Score', ScoreSchema);
