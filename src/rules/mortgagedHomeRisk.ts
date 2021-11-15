import { RiskScore, ClientInformation, HouseOwnershipStatus } from '../model';

export default function mortgadgedHomeRisk(
  { house }: ClientInformation,
  { disability, home, ...currentRiskScore }: RiskScore
): RiskScore {
  let riskBonus = 0;

  if (house?.ownership_status === HouseOwnershipStatus.MORTGAGED) {
    riskBonus += 1;
  }

  return {
    ...currentRiskScore,
    disability: disability === undefined ? undefined : disability + riskBonus,
    home: home === undefined ? undefined : home + riskBonus,
  };
}
