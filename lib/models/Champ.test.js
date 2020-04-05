const Champ = require('./Champ');

describe('Champ model', () => {
  it('has a required name field', () => {
    const champ = new Champ({

    });

    const { errors } = champ.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
