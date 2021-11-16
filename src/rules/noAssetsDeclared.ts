import { ClientInformation,RiskScore } from '../model';

export default function noAssetsDeclared(
  { income, house, vehicle }: ClientInformation,
  { disability, home, auto, ...currentRiskScore }: RiskScore
): RiskScore {
  return {
    ...currentRiskScore,
    disability: income === 0 ? undefined : disability,
    home: house === undefined ? undefined : home,
    auto: vehicle === undefined ? undefined : auto,
  };
}
