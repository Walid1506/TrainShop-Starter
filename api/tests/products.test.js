const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

jest.mock('../src/db', () => ({
  query: jest.fn()
}));

describe('GET /products', () => {
  it('should return products list', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: 'Guide Docker',
          description: 'Support pédagogique',
          price_cents: 1900,
          stock: 20
        }
      ]
    });

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Guide Docker');
  });
});
