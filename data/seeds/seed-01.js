exports.seed = async function(knex) {
  await knex('occupations').truncate()
  await knex('people').truncate()
  await knex('occupations').insert([
    { occupation: 'none' },
    { occupation: 'photographer' },
    { occupation: 'counseler'},
  ])
  await knex('people').insert([
    { first_name: 'Derek', last_name: 'Grubbs', occupation_id: 2 },
    { first_name: 'Keilah', last_name: 'Baldwin', occupation_id: 3 },
  ])
};
