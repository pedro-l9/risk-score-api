import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import noAssetsDeclared from '../noAssetsDeclared';
import { INITIAL_RISK_SCORE } from './testModels';

const DUMMY_CLIENT_INFORMATION: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The noAssetsDeclared rule', () => {
  it("Should return an auto risk score of undefined for a client that doesn't have a car", () => {
    const { vehicle: _, ...clientWithoutCar } = DUMMY_CLIENT_INFORMATION;

    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      auto: undefined,
    };

    const ruleResult = noAssetsDeclared(clientWithoutCar, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it("Should return home and renters risk score of undefined for a client that doesn't have a house", () => {
    const { house: _, ...clientWithoutHouse } = DUMMY_CLIENT_INFORMATION;

    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      home: undefined,
      renters: undefined,
    };

    const ruleResult = noAssetsDeclared(clientWithoutHouse, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should return a disability risk score of undefined for a client that has an income equal to 0', () => {
    const clientWithoutIncome = { ...DUMMY_CLIENT_INFORMATION, income: 0 };

    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      disability: undefined,
    };

    const ruleResult = noAssetsDeclared(
      clientWithoutIncome,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not change the score of a client that has a house, a car and an income above 0', () => {
    const ruleResult = noAssetsDeclared(
      DUMMY_CLIENT_INFORMATION,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
