/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumns('posts', {
    lead: { type: 'text', notNull: true },
  })
}

exports.down = (pgm, run) => {
  pgm.dropTable('posts')
  run()
}