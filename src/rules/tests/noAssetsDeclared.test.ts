import {
  ClientInformation,
  HouseOwnershipStatus,
  RiskScore,
} from '../../model';
import noAssetsDeclared from '../noAssetsDeclared';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

const DUMMY_CLIENT_INFORMATION: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: 'married',
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The noAssetsDeclared rule', () => {
  it("Should return an auto risk score of undefined for a client that doesn't have a car", () => {
    const { vehicle: _, ...clientWithoutCar } = DUMMY_CLIENT_INFORMATION;

    const expectedRiskScore: RiskScore = {
      auto: undefined,
      disability: 0,
      home: 0,
      life: 0,
    };

    const ruleResult = noAssetsDeclared(clientWithoutCar, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it("Should return a home risk score of undefined for a client that doesn't have a house", () => {
    const { house: _, ...clientWithoutHouse } = DUMMY_CLIENT_INFORMATION;

    const expectedRiskScore: RiskScore = {
      auto: 0,
      disability: 0,
      home: undefined,
      life: 0,
    };

    const ruleResult = noAssetsDeclared(clientWithoutHouse, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should return a disability risk score of undefined for a client that has an income equal to 0', () => {
    const clientWithoutIncome = { ...DUMMY_CLIENT_INFORMATION, income: 0 };

    const expectedRiskScore: RiskScore = {
      auto: 0,
      disability: undefined,
      home: 0,
      life: 0,
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
