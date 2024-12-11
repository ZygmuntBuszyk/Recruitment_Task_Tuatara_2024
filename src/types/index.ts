// export type LoanCalculationInput = z.infer<typeof LoanCalculationSchema>; // get interface from schema
export interface LoanCalculationInput {
    totalInstallments: number;
    remainingInstallments: number;
    installmentAmount: number;
    financingAmount: number;
    interestRate: number;
}