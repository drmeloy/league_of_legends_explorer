const { Router } = require('express');
const Champ = require('../models/Champ');

module.exports = Router()
  .post('/', (req, res) => {
    Champ
      .create(req.body)
      .then(champ => res.send(champ));
  });
