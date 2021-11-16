import { ClientInformation,RiskScore } from '../model';

export default function dependentRisk(
  { dependents }: ClientInformation,
  { disability, life, ...currentRiskScore }: RiskScore
): RiskScore {
  let riskBonus = 0;

  if (dependents > 0) {
    riskBonus += 1;
  }

  return {
    ...currentRiskScore,
    disability: disability === undefined ? undefined : disability + riskBonus,
    life: life === undefined ? undefined : life + riskBonus,
  };
}
