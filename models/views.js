var mongoose = require('mongoose');

var viewSchema = new mongoose.Schema({
  name: String,
  pills: [String]
});

module.exports = mongoose.model('views', viewSchema);
