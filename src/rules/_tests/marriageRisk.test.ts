import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import marriageRisk from '../marriageRisk';
import { INITIAL_RISK_SCORE } from './testModels';

const MARRIED_CLIENT: ClientInformation = {
  age: 26,
  dependents: 2,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The marriageRisk rule', () => {
  it('Should add 1 risk point to the life score and remove 1 risk point from the disability score for a client that is married', () => {
    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      disability: -1,
      life: 1,
    };

    const ruleResult = marriageRisk(MARRIED_CLIENT, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const ruleResult = marriageRisk(MARRIED_CLIENT, {});

    expect(ruleResult).toEqual({});
  });

  it("Should not change the score of a client that isn't married", () => {
    const singleClient = {
      ...MARRIED_CLIENT,
      marital_status: MaritalStatus.SINGLE,
    };

    const ruleResult = marriageRisk(singleClient, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
