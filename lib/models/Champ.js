const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passive: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Champ', schema);
