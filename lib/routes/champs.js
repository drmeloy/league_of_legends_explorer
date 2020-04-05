const { Router } = require('express');
const Champ = require('../models/Champ');

module.exports = Router()
  .post('/', (req, res) => {
    Champ
      .create(req.body)
      .then(champ => res.send(champ));
  })
  .get('/', (req, res) => {
    Champ
      .find()
      .then(champs => res.send(champs));
  })
  .get('/:id', (req, res) => {
    Champ
      .findById(req.params.id)
      .then(champ => res.send(champ));
  })
  .patch('/:id', (req, res) => {
    Champ
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(champ => res.send(champ));
  })
  .delete('/:id', (req, res) => {
    Champ
      .findByIdAndDelete(req.params.id)
      .then(deletedChamp => res.send(deletedChamp));
  });
