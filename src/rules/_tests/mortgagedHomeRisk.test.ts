import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import mortgagedHomeRisk from '../mortgagedHomeRisk';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

const DUMMY_CLIENT_DATA: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The mortgagedHomeRisk rule', () => {
  it('Should add 1 risk point to the home and disability scores for a client that has a mortgaged home', () => {
    const clientWithMortgagedHome = {
      ...DUMMY_CLIENT_DATA,
      house: { ownership_status: HouseOwnershipStatus.MORTGAGED },
    };

    const expectedRiskScore: RiskScore = {
      auto: 0,
      disability: 1,
      home: 1,
      life: 0,
    };

    const ruleResult = mortgagedHomeRisk(
      clientWithMortgagedHome,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const clientWithMortgagedHome = {
      ...DUMMY_CLIENT_DATA,
      house: { ownership_status: HouseOwnershipStatus.MORTGAGED },
    };

    const ruleResult = mortgagedHomeRisk(clientWithMortgagedHome, {});

    expect(ruleResult).toEqual({});
  });

  it("Should not change the score of a client that doesn't own a house", () => {
    const clientWithoutHouse = {
      ...DUMMY_CLIENT_DATA,
      house: undefined,
    };

    const ruleResult = mortgagedHomeRisk(
      clientWithoutHouse,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });

  it('Should not change the score of a client that owns a house', () => {
    const ruleResult = mortgagedHomeRisk(DUMMY_CLIENT_DATA, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
