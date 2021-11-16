import request from 'supertest';

import app, { server } from '../..';

afterAll(() => {
  server.close();
});

describe('The error handling middleware', () => {
  it('Should format the bad request error thrown by joi and display a code 400', () => {
    return request(app)
      .post('/api/risk')
      .expect('Content-Type', /text/)
      .expect(
        400,
        'Bad request\n\n"age" is required\n"dependents" is required\n"income" is required\n"marital_status" is required\n"risk_questions" is required'
      );
  });
});
