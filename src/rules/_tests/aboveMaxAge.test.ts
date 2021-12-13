import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import aboveMaxAge from '../aboveMaxAge';
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
describe('The aboveMaxAge rule', () => {
  it('Should return undefined disability and life risk scores for a client that is above max age', () => {
    const clientAboveMaxAge = { ...DUMMY_CLIENT_INFORMATION, age: 61 };

    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      disability: undefined,
      life: undefined,
    };

    const ruleResult = aboveMaxAge(clientAboveMaxAge, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not change the score of a client whose age is below the max', () => {
    const ruleResult = aboveMaxAge(
      DUMMY_CLIENT_INFORMATION,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
