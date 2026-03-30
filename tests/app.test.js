const app = require('../src/index');

describe('Express App API Tests', () => {
  let server;
  
  beforeAll(() => {
    server = app.listen(3001);
  });
  
  afterAll((done) => {
    server.close(done);
  });
  
  test('GET /health возвращает статус ok', async () => {
    const response = await fetch('http://localhost:3001/health');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
  });
  
  test('GET /api/info возвращает информацию о приложении', async () => {
    const response = await fetch('http://localhost:3001/api/info');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.name).toBe('My CI/CD App');
    expect(data.version).toBe('1.0.0');
  });
  
  test('GET /api/greet/:name возвращает приветствие', async () => {
    const response = await fetch('http://localhost:3001/api/greet/Aliya');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Hello, Aliya!');
  });
  
  test('GET /api/greet/:name с пустым именем возвращает ошибку', async () => {
    const response = await fetch('http://localhost:3001/api/greet/');
    expect(response.status).toBe(400);
  });
  
  test('POST /api/echo возвращает полученные данные', async () => {
    const response = await fetch('http://localhost:3001/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'data' })
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.received.test).toBe('data');
  });
});