// Test cases for src/app.js
const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
    it('should respond to GET / with 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });
    // Add more endpoint tests as needed
});
