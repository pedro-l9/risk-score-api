import {
  ClientInformation,
  RiskLevel,
  RiskProfile,
  RiskRule,
  RiskScore,
} from '../model';
import rulesList from '../rules';

export function getClientRiskProfile(
  clientInformation: ClientInformation
): RiskProfile {
  const baseRiskScore = clientInformation.risk_questions.reduce<number>(
    (baseRiskScore, response) => baseRiskScore + response,
    0
  );

  const initialRiskScore: RiskScore = {
    auto: baseRiskScore,
    disability: baseRiskScore,
    home: baseRiskScore,
    life: baseRiskScore,
    renters: baseRiskScore,
  };

  const { auto, disability, home, life, renters } = rulesList.reduce<RiskScore>(
    (currentRiskScore: RiskScore, riskRule: RiskRule): RiskScore =>
      riskRule(clientInformation, currentRiskScore),
    initialRiskScore
  );

  return {
    auto: _getRiskLevelForScore(auto),
    disability: _getRiskLevelForScore(disability),
    home: _getRiskLevelForScore(home),
    life: _getRiskLevelForScore(life),
    renters: _getRiskLevelForScore(renters),
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
