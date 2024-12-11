import {z} from "zod";

export const LoanCalculationSchema = z.object({
    totalInstallments: z.number().positive(),
    remainingInstallments: z.number().positive(),
    installmentAmount: z.number().positive(),
    financingAmount: z.number().positive(),
    interestRate: z.number().positive()
}).refine(data => data.remainingInstallments <= data.totalInstallments, {
    message: "Remaining installments cannot be greater than total installments"
});