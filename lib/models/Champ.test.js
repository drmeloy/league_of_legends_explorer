const Champ = require('./Champ');

describe('Champ model', () => {
  it('has a required name field', () => {
    const champ = new Champ({

    });

    const { errors } = champ.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required passive', () => {
    const champ = new Champ({
      name: 'Megaman'
    });

    const { errors } = champ.validateSync();
    expect(errors.passive.message).toEqual('Path `passive` is required.')
  });
});
