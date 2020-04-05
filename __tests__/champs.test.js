require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a custom champ', () => {
    return request(app)
      .post('/api/v1/champs')
      .send({
        name: 'Megaman',
        passive: 'Lemons',
        q_ability: 'Buster Cannon',
        w_ability: 'Jump n\' Shoot',
        e_ability: 'Summon Rush',
        r_ability: 'X Armor'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Megaman',
          passive: 'Lemons',
          q_ability: 'Buster Cannon',
          w_ability: 'Jump n\' Shoot',
          e_ability: 'Summon Rush',
          r_ability: 'X Armor',
          __v: 0
        });
      });
  });
});
