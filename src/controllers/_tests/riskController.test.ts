import request from 'supertest';

import app, { server } from '../..';
import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
} from '../../model';

const DUMMY_CLIENT: ClientInformation = {
  age: 26,
  dependents: 2,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};

afterAll(() => {
  server.close();
});

describe('POST /api/risk - Get the risk profile for a client', () => {
  describe('The request schema', () => {
    it("Requires an 'age' property", () => {
      const { age: _, ...requestWithoutAge } = DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutAge)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"age" is required');
    });

    it("Requires the 'age' property to be an integer greater than or equal 0", () => {
      const clientWithNegativeAge = { ...DUMMY_CLIENT, age: -1 };

      return request(app)
        .post('/api/risk')
        .send(clientWithNegativeAge)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"age" must be greater than or equal to 0');
    });

    it("Requires a 'dependents' property", () => {
      const { dependents: _, ...requestWithoutDependents } = DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutDependents)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"dependents" is required');
    });

    it("Requires the 'dependents' property to be an integer greater than or equal 0", () => {
      const clientWithNegativeDependents = { ...DUMMY_CLIENT, dependents: -1 };

      return request(app)
        .post('/api/risk')
        .send(clientWithNegativeDependents)
        .expect('Content-Type', /text/)
        .expect(
          400,
          'Bad request\n\n"dependents" must be greater than or equal to 0'
        );
    });

    it("Accepts an undefined 'house' property", () => {
      const { house: _, ...requestWithoutHouse } = DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutHouse)
        .expect(200);
    });

    it("Requires the 'house' property to be an object with the 'ownership_status' property", () => {
      const wrongHouseOwnershipStatus = {
        ...DUMMY_CLIENT,
        house: { ownership_status: 'potato' },
      };

      return request(app)
        .post('/api/risk')
        .send(wrongHouseOwnershipStatus)
        .expect('Content-Type', /text/)
        .expect(
          400,
          'Bad request\n\n"house.ownership_status" must be one of [owned, mortgaged, rented]'
        );
    });

    it("Requires an 'income' property", () => {
      const { income: _, ...requestWithoutIncome } = DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutIncome)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"income" is required');
    });

    it("Requires the 'income' property to be an integer greater than or equal 0", () => {
      const clientWithNegativeIncome = { ...DUMMY_CLIENT, income: -1 };

      return request(app)
        .post('/api/risk')
        .send(clientWithNegativeIncome)
        .expect('Content-Type', /text/)
        .expect(
          400,
          'Bad request\n\n"income" must be greater than or equal to 0'
        );
    });

    it("Requires an 'marital_status' property", () => {
      const { marital_status: _, ...requestWithoutMaritalStatus } =
        DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutMaritalStatus)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"marital_status" is required');
    });

    it("Requires the 'marital_status' property to be either 'married' or 'single'", () => {
      const invalidMaritalStatus = {
        ...DUMMY_CLIENT,
        marital_status: 'maried',
      };

      return request(app)
        .post('/api/risk')
        .send(invalidMaritalStatus)
        .expect('Content-Type', /text/)
        .expect(
          400,
          'Bad request\n\n"marital_status" must be one of [married, single]'
        );
    });

    it("Requires a 'risk_questions' property", () => {
      const { risk_questions: _, ...requestWithoutRiskQuestions } =
        DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutRiskQuestions)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"risk_questions" is required');
    });

    it("Requires the 'risk_questions' property to be an array with 3 binary values", () => {
      const wrongRiskQuestions = { ...DUMMY_CLIENT, risk_questions: [1, 2] };

      return request(app)
        .post('/api/risk')
        .send(wrongRiskQuestions)
        .expect('Content-Type', /text/)
        .expect(
          400,
          'Bad request\n\n"risk_questions[1]" must be one of [1, 0]\n"risk_questions" must contain 3 items'
        );
    });

    it("Accepts an undefined 'vehicle' property", () => {
      const { vehicle: _, ...requestWithoutVehicle } = DUMMY_CLIENT;

      return request(app)
        .post('/api/risk')
        .send(requestWithoutVehicle)
        .expect(200);
    });

    it("Requires the 'vehicle' property to be an object with the 'year' property", () => {
      const wrongVehicleOwnershipStatus = {
        ...DUMMY_CLIENT,
        vehicle: { year: -1 },
      };

      return request(app)
        .post('/api/risk')
        .send(wrongVehicleOwnershipStatus)
        .expect('Content-Type', /text/)
        .expect(400, 'Bad request\n\n"vehicle.year" must be a positive number');
    });
  });
});
