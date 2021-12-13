import {
  ClientInformation,
  MaritalStatus,
  RiskLevel,
  RiskProfile,
} from '../../model';
import { getClientRiskProfile } from '../riskScoreService';

describe('The riskScoreService', () => {
  describe('The getClientRiskProfile function', () => {
    it("Should apply all the riskRules and return the client's risk profile given the client's information", () => {
      const DUMMY_CLIENT_INFORMATION: ClientInformation = {
        age: 55,
        dependents: 2,
        income: 2000,
        marital_status: MaritalStatus.MARRIED,
        risk_questions: [0, 0, 0],
      };

      const expectedRiskProfile: RiskProfile = {
        auto: RiskLevel.INELIGIBLE,
        disability: RiskLevel.ECONOMIC,
        home: RiskLevel.INELIGIBLE,
        life: RiskLevel.REGULAR,
        renters: RiskLevel.INELIGIBLE,
        umbrella: RiskLevel.ECONOMIC,
      };

      const clientRiskProfile = getClientRiskProfile(DUMMY_CLIENT_INFORMATION);

      expect(clientRiskProfile).toEqual(expectedRiskProfile);
    });

    it('Should sum the values of the risk_questions to obtain the base risk score', () => {
      const DUMMY_CLIENT_INFORMATION: ClientInformation = {
        age: 55,
        dependents: 2,
        income: 2000,
        marital_status: MaritalStatus.MARRIED,
        risk_questions: [1, 1, 1],
      };

      const expectedRiskProfile: RiskProfile = {
        auto: RiskLevel.INELIGIBLE,
        disability: RiskLevel.RESPONSIBLE,
        home: RiskLevel.INELIGIBLE,
        life: RiskLevel.RESPONSIBLE,
        renters: RiskLevel.INELIGIBLE,
        umbrella: RiskLevel.INELIGIBLE,
      };

      const clientRiskProfile = getClientRiskProfile(DUMMY_CLIENT_INFORMATION);

      expect(clientRiskProfile).toEqual(expectedRiskProfile);
    });

    it('Should make the client ineligible to the umbrella insurance line if none of the riskLevels of the profile is ECONOMIC', () => {
      const DUMMY_CLIENT_INFORMATION: ClientInformation = {
        age: 55,
        dependents: 2,
        income: 2000,
        marital_status: MaritalStatus.MARRIED,
        risk_questions: [1, 1, 1],
      };

      const expectedRiskProfile: RiskProfile = {
        auto: RiskLevel.INELIGIBLE,
        disability: RiskLevel.RESPONSIBLE,
        home: RiskLevel.INELIGIBLE,
        life: RiskLevel.RESPONSIBLE,
        renters: RiskLevel.INELIGIBLE,
        umbrella: RiskLevel.INELIGIBLE,
      };

      const clientRiskProfile = getClientRiskProfile(DUMMY_CLIENT_INFORMATION);

      expect(clientRiskProfile).toEqual(expectedRiskProfile);
    });
  });
});
