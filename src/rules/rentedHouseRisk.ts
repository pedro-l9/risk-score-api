import { ClientInformation, HouseOwnershipStatus, RiskScore } from '../model';

export default function rentedHouseRisk(
  { house }: ClientInformation,
  currentRiskScore: RiskScore
): RiskScore {
  if (house?.ownership_status === HouseOwnershipStatus.RENTED) {
    return {
      ...currentRiskScore,
      home: undefined,
    };
  }

  return {
    ...currentRiskScore,
    renters: undefined,
  };
}
