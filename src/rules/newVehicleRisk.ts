import { RiskScore, ClientInformation, MaritalStatus } from '../model';

const NEW_VEHICLE_AGE_THRESHOLD = 5;

export default function newVehicleRisk(
  { vehicle }: ClientInformation,
  { auto, ...currentRiskScore }: RiskScore
): RiskScore {
  let riskBonus = 0;
  const currentYear = new Date().getFullYear();

  if (vehicle && vehicle.year > currentYear - NEW_VEHICLE_AGE_THRESHOLD) {
    riskBonus += 1;
  }

  return {
    ...currentRiskScore,
    auto: auto === undefined ? undefined : auto + riskBonus,
  };
}
