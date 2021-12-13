import { ClientInformation, RiskScore } from '../model';

export default function noAssetsDeclared(
  { income, house, vehicle }: ClientInformation,
  { disability, home, auto, renters, ...currentRiskScore }: RiskScore
): RiskScore {
  return {
    ...currentRiskScore,
    disability: income === 0 ? undefined : disability,
    home: house === undefined ? undefined : home,
    renters: house === undefined ? undefined : renters,
    auto: vehicle === undefined ? undefined : auto,
  };
}
