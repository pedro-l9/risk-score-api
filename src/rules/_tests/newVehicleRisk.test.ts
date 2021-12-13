import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
  RiskScore,
} from '../../model';
import newVehicleRisk from '../newVehicleRisk';
import { INITIAL_RISK_SCORE } from './testModels';

const CLIENT_WITH_NEW_VEHICLE: ClientInformation = {
  age: 26,
  dependents: 2,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2017 },
};
describe('The newVehicleRisk rule', () => {
  it('Should add 1 risk point to the auto score when the client has a vehicle that was produced within the last 5 years', () => {
    const expectedRiskScore: RiskScore = {
      ...INITIAL_RISK_SCORE,
      auto: 1,
    };

    const ruleResult = newVehicleRisk(
      CLIENT_WITH_NEW_VEHICLE,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedRiskScore);
  });

  it('Should not attribute a score to an undefined value', () => {
    const ruleResult = newVehicleRisk(CLIENT_WITH_NEW_VEHICLE, {});

    expect(ruleResult).toEqual({});
  });

  it("Should not change the score of a client that doesn't have a vehicle", () => {
    const clientWithoutVehicle = {
      ...CLIENT_WITH_NEW_VEHICLE,
      vehicle: undefined,
    };

    const ruleResult = newVehicleRisk(clientWithoutVehicle, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });

  it("Should not change the score of a client whose vehicle wasn't produced within the last 5 years", () => {
    const clientWithOldVehicle = {
      ...CLIENT_WITH_NEW_VEHICLE,
      vehicle: { year: 2016 },
    };

    const ruleResult = newVehicleRisk(clientWithOldVehicle, INITIAL_RISK_SCORE);

    expect(ruleResult).toEqual(INITIAL_RISK_SCORE);
  });
});
