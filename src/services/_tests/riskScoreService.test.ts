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
      };

      const clientRiskProfile = getClientRiskProfile(DUMMY_CLIENT_INFORMATION);

      expect(clientRiskProfile).toEqual(expectedRiskProfile);
    });
  });
});
