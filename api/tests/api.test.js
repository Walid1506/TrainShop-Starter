const request = require('supertest');
const app = require('../src/app');

// Mock de la base de données
jest.mock('../src/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 })
}));

describe('API TrainShop Tests Suite', () => {
  test('GET /health doit répondre 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  test('POST /products sans prix doit échouer (Erreur 400)', async () => {
    const res = await request(app).post('/products').send({ name: "Train Express" });
    expect(res.statusCode).toBe(400);
  });

  test('POST /products complet doit réussir (201)', async () => {
    const res = await request(app).post('/products').send({ name: "TGV", price_cents: 5000 });
    expect(res.statusCode).toBe(201);
  });
});
