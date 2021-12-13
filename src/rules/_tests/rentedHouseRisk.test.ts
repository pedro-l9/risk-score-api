import {
  ClientInformation,
  HouseOwnershipStatus,
  MaritalStatus,
} from '../../model';
import rentedHouseRisk from '../rentedHouseRisk';
import { INITIAL_RISK_SCORE } from './testModels';

const DUMMY_CLIENT_DATA: ClientInformation = {
  age: 26,
  dependents: 0,
  house: { ownership_status: HouseOwnershipStatus.OWNED },
  income: 2000,
  marital_status: MaritalStatus.MARRIED,
  risk_questions: [0, 0, 0],
  vehicle: { year: 2020 },
};
describe('The rentedHouseRisk rule', () => {
  it('Should make the renters insurance score undefined if the client owns the house', () => {
    const ruleResult = rentedHouseRisk(DUMMY_CLIENT_DATA, INITIAL_RISK_SCORE);

    const expectedResult = {
      ...INITIAL_RISK_SCORE,
      renters: undefined,
    };

    expect(ruleResult).toEqual(expectedResult);
  });

  it('Should make the home insurance score undefined if the client has a rented house', () => {
    const clientWithRentedHome = {
      ...DUMMY_CLIENT_DATA,
      house: { ownership_status: HouseOwnershipStatus.RENTED },
    };

    const expectedResult = {
      ...INITIAL_RISK_SCORE,
      home: undefined,
    };

    const ruleResult = rentedHouseRisk(
      clientWithRentedHome,
      INITIAL_RISK_SCORE
    );

    expect(ruleResult).toEqual(expectedResult);
  });
});
