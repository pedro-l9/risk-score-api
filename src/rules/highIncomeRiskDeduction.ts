import { ClientInformation, RiskScore } from '../model';

const HIGH_INCOME_THRESHOLD = 200000;

export default function highIncomeRiskDeduction(
  { income }: ClientInformation,
  currentRiskScore: RiskScore
): RiskScore {
  if (income > HIGH_INCOME_THRESHOLD) {
    const { disability, home, auto, life, renters, umbrella } =
      currentRiskScore;

    return {
      disability: disability === undefined ? undefined : disability - 1,
      home: home === undefined ? undefined : home - 1,
      auto: auto === undefined ? undefined : auto - 1,
      life: life === undefined ? undefined : life - 1,
      renters: renters === undefined ? undefined : renters - 1,
      umbrella: umbrella === undefined ? undefined : umbrella - 1,
    };
  }

  return currentRiskScore;
}
