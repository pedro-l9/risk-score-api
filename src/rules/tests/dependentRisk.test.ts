import {
  ClientInformation,
  HouseOwnershipStatus,
  RiskScore,
} from '../../model';
import dependentRisk from '../dependentRisk';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

const CLIENT_WITH_DEPENDENTS: ClientInformation = {
  age: 26,
  dependents: 2,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: 'married',
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The dependentRisk rule', () => {
  it('Should add 1 risk point to the life and disability scores for a client that has dependents', () => {
    const expectedRiskScore: RiskScore = {
      auto: 0,
      disability: 1,
      home: 0,
      life: 1,
    };

    const ruleResult = dependentRisk(
      CLIENT_WITH_DEPENDENTS,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const ruleResult = dependentRisk(CLIENT_WITH_DEPENDENTS, {});

    expect(ruleResult).toEqual({});
  });

  it("Should not change the score of a client that doesn't have dependents", () => {
    const clientWithoutDependents = {
      ...CLIENT_WITH_DEPENDENTS,
      dependents: 0,
    };

    const ruleResult = dependentRisk(
      clientWithoutDependents,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
