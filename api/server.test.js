const db = require('../data/db-config');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe('[GET] /api/people', () => {
  test('responds with 200 OK', async () => {
    const res = await request(server).get('/api/people');
    expect(res.status).toBe(200)
  })
  test('responds with all the people', async () => {
    const res = await request(server).get('/api/people')
    expect(res.body).toHaveLength(2)
  })
})

describe('[GET] /api/people/:id', () => {
  test('responds with 200 OK', async () => {
    const res = await request(server).get('/api/people/1');
    expect(res.status).toBe(200)
  })
  test('responds with the person with the given id', async () => {
    const res = await request(server).get('/api/people/1');
    expect(res.body).toMatchObject({
        first_name: 'Derek', last_name: 'Grubbs', occupation: 'photographer'
    })
  })
})

describe('[POST] /api/people', () => {
  const brittany = {
    first_name: 'Brittany', last_name: 'Hayes', occupation: 'post office'
  }
  test('responds with 201 CREATED', async () => {
    const res = await request(server).post('/api/people').send(brittany)
    expect(res.status).toBe(201)
  })
  test('adds a person to the database', async () => {
    await request(server).post('/api/people').send(brittany)
    expect(await db('people')).toHaveLength(3)
  })
  test('responds with newly added person', async () => {
    const res = await request(server).post('/api/people').send(brittany)
    expect(res.body).toMatchObject(brittany)
  })
})

describe('[DELETE] /api/people/:id', () => {
  test('responds with 200 OK', async () => {
    const res = await request(server).delete('/api/people/1')
    expect(res.status).toBe(200)
  })
  test('responds with the removed person', async () => {
    const res = await request(server).delete('/api/people/1')
    expect(res.body).toMatchObject({
      first_name: 'Derek', last_name: 'Grubbs', occupation: 'photographer'
    })
  })
  test('person is removed from the db', async () => {
    await request(server).delete('/api/people/1')
    expect(await db('people')).toHaveLength(1)
  })
})