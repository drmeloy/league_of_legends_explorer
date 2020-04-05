require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Champ = require('../lib/models/Champ');

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

  it('gets all custom champs', () => {
    const champs = Champ.create([
      { name: 'Megaman', passive: 'Lemons', q_ability: 'Buster Cannon', w_ability: 'Jump n\' Shoot', e_ability: 'Summon Rush', r_ability: 'X Armor' },
      { name: 'Protoman', passive: 'Protoshield', q_ability: 'Buster Sword', w_ability: 'Dash', e_ability: 'Anime Hair', r_ability: 'Slash n\' Dash' },
      { name: 'Rush', passive: 'Good Boy', q_ability: 'Hover Board Form', w_ability: 'Tank Form', e_ability: 'Plane Form', r_ability: 'Mega Bark' }
    ]);

    return request(app)
      .get('/api/v1/champs')
      .then(res => {
        champs.forEach(champ => {
          expect(res.body).toContainEqual({
            _id: champ._id.toString(),
            name: champ.name,
            q_ability: champ.q_ability,
            w_ability: champ.w_ability,
            e_ability: champ.e_ability,
            r_ability: champ.r_ability,
            __v: 0
          });
        });
      });
  });
});
