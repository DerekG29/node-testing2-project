const People = require('./people-model');
const db = require('../../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async () => {
  await db.seed.run();
})

test('enviroment is testing', () => {
  expect(process.env.NODE_ENV).toBe('testing');
})

describe('getAll', () => {
  test('gets all people from the table', async () => {
    const result = await People.getAll();
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      first_name: 'Derek', last_name: 'Grubbs', occupation: 'photographer'
    })
    expect(result[1]).toMatchObject({
      first_name: 'Keilah', last_name: 'Baldwin', occupation: 'counseler'
    })
  })
})

describe('getById', () => {
  test('gets a person by the given id', async () => {
    let result = await People.getById(1)
    expect(result).toMatchObject({
      first_name: 'Derek', last_name: 'Grubbs', occupation: 'photographer'
    })
    result = await People.getById(2)
    expect(result).toMatchObject({
      first_name: 'Keilah', last_name: 'Baldwin', occupation: 'counseler'
    })
  })
})

describe('insert', () => {
  const brittany = {
    first_name: 'Brittany', last_name: 'Hayes', occupation: 'post office'
  }
  test('returns the newly added person', async () => {
    const result = await People.insert(brittany);
    expect(result).toMatchObject(brittany);
  })
  test('adds the person to the people table', async () => {
    await People.insert(brittany);
    const records = await db('people')
    expect(records).toHaveLength(3)
  })
})

describe('remove', () => {
  test('returns removed person with the given id', async () => {
    const result = await People.remove(1)
    expect(result).toMatchObject({
      first_name: 'Derek', last_name: 'Grubbs', occupation: 'photographer'
    })
  })
  test('removes person with given id from the table', async () => {
    await People.remove(1)
    const records = await db('people')
    expect(records).toHaveLength(1)
  })
})
