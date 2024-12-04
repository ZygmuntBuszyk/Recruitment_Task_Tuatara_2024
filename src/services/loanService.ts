import { CalculationRepository } from "../repositories/calculationRepository"
import { NBPService } from "./NBPService"
import { LoanCalculationInput } from "../types"
import {Calculation} from "@/entities/Calculation.entity";
import { EmailService } from './emailService';

export class LoanService {
    private calculationRepository: CalculationRepository
    private nbpService: NBPService
    private emailService: EmailService;

    constructor() {
        this.calculationRepository = new CalculationRepository()
        this.nbpService = new NBPService()
        this.emailService = new EmailService()
    }

    async calculateLoan(input: LoanCalculationInput): Promise<Calculation> {
        const referenceRate = await this.nbpService.getReferenceRate()

        if (input.interestRate > referenceRate) {
            throw new Error('Interest rate is higher than reference rate')
        }

        // Calculating remaining amount - all previous installments were liquid'
        const paidInstallments = input.totalInstallments - input.remainingInstallments
        const remainingAmount = input.financingAmount - (paidInstallments * input.installmentAmount)

        // Calculating new installment amount with reference rate
        // standard loan payment formula
        // PMT = (PV * r * (1 + r)^n) / ((1 + r)^n - 1)
        const monthlyRate = referenceRate / 12 / 100
        const newInstallmentAmount =
            (remainingAmount * monthlyRate * Math.pow(1 + monthlyRate, input.remainingInstallments)) /
            (Math.pow(1 + monthlyRate, input.remainingInstallments) - 1)

        // with our guidelines we want to save newInstallmentAmount even if it's negative
        const calculation =  await this.calculationRepository.save({
            totalInstallments: input.totalInstallments,
            remainingInstallments: input.remainingInstallments,
            installmentAmount: input.installmentAmount,
            financingAmount: input.financingAmount,
            interestRate: input.interestRate,
            referenceRate: referenceRate,
            referenceRateDate: new Date(),
            remainingAmount: remainingAmount,
            newInstallmentAmount: newInstallmentAmount
        })

        if (newInstallmentAmount <= 0) {
            try {
                await this.emailService.sendNegativeInstallmentAlert(calculation);
            } catch (error) {
                console.error('Failed to send alert email', error);
            }
        }

        return calculation;
    }
}