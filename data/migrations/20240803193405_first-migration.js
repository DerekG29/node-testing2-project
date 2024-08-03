exports.up = function(knex) {
  return knex.schema
    .createTable('occupations', tbl => {
      tbl.increments('occupation_id');
      tbl.string('occupation', 64)
        .unique()
        .notNullable();
    })
    .createTable('people', tbl => {
      tbl.increments('id');
      tbl.string('first_name', 64)
        .notNullable();
      tbl.string('last_name', 64)
        .notNullable();
      tbl.integer('occupation_id')
        .unsigned()
        .notNullable()
        .references('occupation_id')
        .inTable('occupations')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('people')
    .dropTableIfExists('occupations')
};
