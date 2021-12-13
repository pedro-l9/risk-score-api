import { RiskRule } from '../model';
import aboveMaxAge from './aboveMaxAge';
import dependentRisk from './dependentRisk';
import highIncomeRiskDeduction from './highIncomeRiskDeduction';
import marriageRisk from './marriageRisk';
import mortgagedHomeRisk from './mortgagedHomeRisk';
import newVehicleRisk from './newVehicleRisk';
import noAssetsDeclared from './noAssetsDeclared';
import rentedHouseRisk from './rentedHouseRisk';
import youthRiskDeduction from './youthRiskDeduction';

const rulesList: RiskRule[] = [
  aboveMaxAge,
  dependentRisk,
  highIncomeRiskDeduction,
  marriageRisk,
  mortgagedHomeRisk,
  newVehicleRisk,
  noAssetsDeclared,
  youthRiskDeduction,
  rentedHouseRisk,
];

export default rulesList;
