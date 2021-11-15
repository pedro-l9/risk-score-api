type BinaryNumber = 0 | 1;

export enum HouseOwnershipStatus {
  OWNED = 'owned',
  MORTGAGED = 'mortgaged',
}
export interface ClientInformation {
  age: number;
  dependents: number;
  house?: { ownership_status: HouseOwnershipStatus };
  income: number;
  marital_status: 'married' | 'single';
  risk_questions: [BinaryNumber, BinaryNumber, BinaryNumber];
  vehicle?: { year: number };
}

export enum RiskLevel {
  INELIGIBLE = 'ineligible',
  REGULAR = 'regular',
  ECONOMIC = 'economic',
  RESPONSIBLE = 'responsible',
}

export interface RiskScore {
  auto?: number;
  disability?: number;
  home?: number;
  life?: number;
}

export interface RiskResult {
  auto: RiskLevel;
  disability: RiskLevel;
  home: RiskLevel;
  life: RiskLevel;
}
