import { ClientInformation, RiskScore } from '../model';

export default function youthRiskDeduction(
  { age }: ClientInformation,
  { disability, home, auto, life, renters }: RiskScore
): RiskScore {
  let riskDeduction = 0;

  if (age < 30) {
    riskDeduction = 2;
  } else if (age < 40) {
    riskDeduction = 1;
  }

  return {
    disability:
      disability === undefined ? undefined : disability - riskDeduction,
    home: home === undefined ? undefined : home - riskDeduction,
    auto: auto === undefined ? undefined : auto - riskDeduction,
    life: life === undefined ? undefined : life - riskDeduction,
    renters: renters === undefined ? undefined : renters - riskDeduction,
  };
}
