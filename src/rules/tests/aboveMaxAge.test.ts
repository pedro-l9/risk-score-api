import { ClientInformation, RiskScore } from '../../model';
import aboveMaxAge from '../aboveMaxAge';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

const DUMMY_CLIENT_INFORMATION: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: 'owned' },
  income: 2000,
  marital_status: 'married',
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe(' The aboveMaxAge rule', () => {
  it('Should return undefined disability and life risk scores for a client that is above max age', () => {
    const clientAboveMaxAge = { ...DUMMY_CLIENT_INFORMATION, age: 61 };

    const expectedRiskScore: RiskScore = {
      auto: 0,
      disability: undefined,
      home: 0,
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
