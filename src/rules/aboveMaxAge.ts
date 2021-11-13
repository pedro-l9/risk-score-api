import { RiskScore, ClientInformation } from '../model';

const MAX_AGE = 60;

export default function aboveMaxAge(
  { age }: ClientInformation,
  { disability, life, ...currentRiskScore }: RiskScore
): RiskScore {
  const isClientAboveMaxAge = age > MAX_AGE;

  return {
    ...currentRiskScore,
    disability: isClientAboveMaxAge ? undefined : disability,
    life: isClientAboveMaxAge ? undefined : life,
  };
}
