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

  })
})