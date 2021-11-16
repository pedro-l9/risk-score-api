import { ClientInformation,RiskScore } from '../model';

const HIGH_INCOME_THRESHOLD = 200000;

export default function highIncomeRiskDeduction(
  { income }: ClientInformation,
  { disability, home, auto, life }: RiskScore
): RiskScore {
  if (income > HIGH_INCOME_THRESHOLD) {
    return {
      disability: disability === undefined ? undefined : disability - 1,
      home: home === undefined ? undefined : home - 1,
      auto: auto === undefined ? undefined : auto - 1,
      life: life === undefined ? undefined : life - 1,
    };
  }

  return {
    disability,
    home,
    auto,
    life,
  };
}
