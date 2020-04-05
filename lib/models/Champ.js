const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passive: {
    type: String,
    required: true
  },
  q_ability: {
    type: String,
    required: true
  },
  w_ability: {
    type: String,
    required: true
  },
  e_ability: {
    type: String,
    required: true
  },
  r_ability: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Champ', schema);
