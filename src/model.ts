type BinaryNumber = 0 | 1;

export interface ClientInformation {
  age: number;
  dependents: number;
  house?: { ownership_status: 'owned' | 'mortgaged' };
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
