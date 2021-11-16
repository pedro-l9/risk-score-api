import { ClientInformation, MaritalStatus,RiskScore } from '../model';

export default function marriageRisk(
  { marital_status }: ClientInformation,
  { disability, life, ...currentRiskScore }: RiskScore
): RiskScore {
  let riskOffset = 0;

  if (marital_status === MaritalStatus.MARRIED) {
    riskOffset += 1;
  }

  return {
    ...currentRiskScore,
    disability: disability === undefined ? undefined : disability - riskOffset,
    life: life === undefined ? undefined : life + riskOffset,
  };
}
