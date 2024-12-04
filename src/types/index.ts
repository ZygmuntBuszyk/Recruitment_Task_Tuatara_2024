export interface LoanCalculationInput {
    totalInstallments: number;
    remainingInstallments: number;
    installmentAmount: number;
    financingAmount: number;
    interestRate: number;
}