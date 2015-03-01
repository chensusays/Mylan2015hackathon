var mongoose = require('mongoose');

var viewSchema = new mongoose.Schema({
  name: String,
  drugs: [String]
});

module.exports = mongoose.model('views', viewSchema);
