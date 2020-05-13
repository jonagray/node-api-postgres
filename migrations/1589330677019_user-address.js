/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns('users', {
    address: { type: 'text' },
  })
};

exports.down = pgm => {};
