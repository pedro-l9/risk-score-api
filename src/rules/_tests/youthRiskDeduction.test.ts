import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import youthRiskDeduction from '../youthRiskDeduction';
import { INITIAL_RISK_SCORE } from './testModels';

const CLIENT_UNDER_30: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The youthRiskDeduction rule', () => {
  it('Should deduct 2 risk points from all lines of insurance for a client that is under 30 years old', () => {
    const expectedRiskScore: RiskScore = {
      auto: -2,
      disability: -2,
      home: -2,
      life: -2,
      renters: -2,
      umbrella: -2,
    };

    const ruleResult = youthRiskDeduction(CLIENT_UNDER_30, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should deduct 1 risk point from all lines of insurance for a client that is between 30 and 40 years old', () => {
    const clientWIthAge35 = { ...CLIENT_UNDER_30, age: 35 };

    const expectedRiskScore: RiskScore = {
      auto: -1,
      disability: -1,
      home: -1,
      life: -1,
      renters: -1,
      umbrella: -1,
    };

    const ruleResult = youthRiskDeduction(clientWIthAge35, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const ruleResult = youthRiskDeduction(CLIENT_UNDER_30, {});

    expect(ruleResult).toEqual({});
  });

  it('Should not change the score of a client that is above 40 years old', () => {
    const clientWIthAge41 = { ...CLIENT_UNDER_30, age: 41 };

    const ruleResult = youthRiskDeduction(clientWIthAge41, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
