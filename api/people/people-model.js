const db = require('../../data/db-config');

module.exports = {
  getAll,
  getById,
  insert,
  remove
}

function getAll() {
  return db('people as p')
    .innerJoin('occupations as o', 'p.occupation_id', 'o.occupation_id')
    .select('first_name', 'last_name', 'occupation')
}

function getById(id) {
  return db('people as p')
    .innerJoin('occupations as o', 'p.occupation_id', 'o.occupation_id')
    .where({ id })
    .first()
    .select('first_name', 'last_name', 'occupation')
}

async function insert({ first_name, last_name, occupation }) {
  let created_id;
  await db.transaction(async trx => {
    let occupation_id_to_use;
    const [occupation_exists] = await trx('occupations').where({ occupation })
    if (occupation_exists) {
      occupation_id_to_use = occupation_exists.occupation_id
    } else {
      const [occupation_id] = await trx('occupations').insert({ occupation })
      occupation_id_to_use = occupation_id
    }
    const [id] = await trx('people').insert(
      { first_name, last_name, occupation_id: occupation_id_to_use }
    )
    created_id = id
  })
  return getById(created_id)
}

async function remove(id) {
  const removed = await getById(id)
  await db('people')
    .where({ id })
    .del()
  return removed
}