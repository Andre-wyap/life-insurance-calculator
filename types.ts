export interface CalculatorState {
  // Income Replacement
  monthlyExpenses: number;
  yearsToCover: number;

  // Liabilities
  housingLoan: number;
  carLoan: number;
  creditCardDebt: number;
  personalLoans: number;

  // Asset Liquidation
  estimatedPropertyValue: number;
  totalAssetValue: number;

  // Other Needs
  childrenEducation: number;
  emergencyFund: number;
  funeralExpenses: number;
}

export interface CalculationResult {
  incomeReplacementTotal: number;
  liabilitiesTotal: number;
  liquidationCostTotal: number;
  otherNeedsTotal: number;
  grandTotal: number;
}

export interface LeadFormData {
  fullName: string;
  birthDate: string;
  gender: 'Male' | 'Female';
  isSmoker: boolean;
  phone: string;
  email: string;
}

export interface WebhookPayload {
  formData: LeadFormData;
  coverageDetails: CalculatorState & CalculationResult;
  timestamp: string;
}
