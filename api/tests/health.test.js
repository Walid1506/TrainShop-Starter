const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/db', () => ({
  query: jest.fn().mockResolvedValue({ rows: [{ ok: 1 }] })
}));

describe('GET /health', () => {
  it('should return API status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
