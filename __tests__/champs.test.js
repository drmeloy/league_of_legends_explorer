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

  it('gets all custom champs', async() => {
    await Champ.create([
      { name: 'Megaman', passive: 'Lemons', q_ability: 'Buster Cannon', w_ability: 'Jump n\' Shoot', e_ability: 'Summon Rush', r_ability: 'X Armor' },
      { name: 'Protoman', passive: 'Protoshield', q_ability: 'Buster Sword', w_ability: 'Dash', e_ability: 'Anime Hair', r_ability: 'Slash n\' Dash' },
      { name: 'Rush', passive: 'Good Boy', q_ability: 'Hover Board Form', w_ability: 'Tank Form', e_ability: 'Plane Form', r_ability: 'Mega Bark' }
    ]);

    return request(app)
      .get('/api/v1/champs')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String), name: 'Megaman', passive: 'Lemons', q_ability: 'Buster Cannon', w_ability: 'Jump n\' Shoot', e_ability: 'Summon Rush', r_ability: 'X Armor', __v: 0 },
          { _id: expect.any(String), name: 'Protoman', passive: 'Protoshield', q_ability: 'Buster Sword', w_ability: 'Dash', e_ability: 'Anime Hair', r_ability: 'Slash n\' Dash', __v: 0 },
          { _id: expect.any(String), name: 'Rush', passive: 'Good Boy', q_ability: 'Hover Board Form', w_ability: 'Tank Form', e_ability: 'Plane Form', r_ability: 'Mega Bark', __v: 0 }
        ]);
      });
  });

  it('gets a custom champ by id', async() => {
    const champ = await Champ.create({
      name: 'Megaman',
      passive: 'Lemons',
      q_ability: 'Buster Cannon',
      w_ability: 'Jump n\' Shoot',
      e_ability: 'Summon Rush',
      r_ability: 'X Armor'
    });

    return request(app)
      .get(`/api/v1/champs/${champ._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: champ._id.toString(),
          name: champ.name,
          passive: champ.passive,
          q_ability: champ.q_ability,
          w_ability: champ.w_ability,
          e_ability: champ.e_ability,
          r_ability: champ.r_ability,
          __v: 0
        });
      });
  });

  it('updates a champ by id', async() => {
    const champ = await Champ.create({
      name: 'Megaman',
      passive: 'Lemons',
      q_ability: 'Buster Cannon',
      w_ability: 'Jump n\' Shoot',
      e_ability: 'Summon Rush',
      r_ability: 'X Armor'
    });

    return request(app)
      .patch(`/api/v1/champs/${champ._id}`)
      .send({ q_ability: 'Mega Buster' })
      .then(res => {
        expect(res.body).toEqual({
          _id: champ._id.toString(),
          name: 'Megaman',
          passive: 'Lemons',
          q_ability: 'Mega Buster',
          w_ability: 'Jump n\' Shoot',
          e_ability: 'Summon Rush',
          r_ability: 'X Armor',
          __v: 0
        });
      });
  });
});
