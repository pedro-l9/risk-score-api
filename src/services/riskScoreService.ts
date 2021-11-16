import {
  ClientInformation,
  RiskLevel,
  RiskProfile,
  RiskRule,
  RiskScore,
} from '../model';
import rulesList from '../rules';

const INITIAL_RISK_SCORE: RiskScore = {
  auto: 0,
  disability: 0,
  home: 0,
  life: 0,
};

export function getClientRiskProfile(
  clientInformation: ClientInformation
): RiskProfile {
  const { auto, disability, home, life } = rulesList.reduce<RiskScore>(
    (currentRiskScore: RiskScore, riskRule: RiskRule): RiskScore =>
      riskRule(clientInformation, currentRiskScore),
    INITIAL_RISK_SCORE
  );

  return {
    auto: _getRiskLevelForScore(auto),
    disability: _getRiskLevelForScore(disability),
    home: _getRiskLevelForScore(home),
    life: _getRiskLevelForScore(life),
  };
}

function _getRiskLevelForScore(riskScore?: number) {
  if (riskScore === undefined) {
    return RiskLevel.INELIGIBLE;
  } else if (riskScore <= 0) {
    return RiskLevel.ECONOMIC;
  } else if (riskScore >= 3) {
    return RiskLevel.RESPONSIBLE;
  } else {
    return RiskLevel.REGULAR;
  }
}
