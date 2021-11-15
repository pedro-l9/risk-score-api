import {
  ClientInformation,
  HouseOwnershipStatus,
  RiskScore,
} from '../../model';
import highIncomeRiskDeduction from '../highIncomeRiskDeduction';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

const HIGH_INCOME_CLIENT: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 201000,
  marital_status: 'married',
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The highIncomeRiskDeduction rule', () => {
  it('Should deduct 1 risk point from all lines of insurance for a client that has an income above 200k', () => {
    const expectedRiskScore: RiskScore = {
      auto: -1,
      disability: -1,
      home: -1,
      life: -1,
    };

    const ruleResult = highIncomeRiskDeduction(
      HIGH_INCOME_CLIENT,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const ruleResult = highIncomeRiskDeduction(HIGH_INCOME_CLIENT, {});

    expect(ruleResult).toEqual({});
  });

  it('Should not change the score of a client that has an income bellow 200k', () => {
    const lowIncomeClient = { ...HIGH_INCOME_CLIENT, income: 20000 };

    const ruleResult = highIncomeRiskDeduction(
      lowIncomeClient,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
