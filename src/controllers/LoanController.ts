import { Request, Response } from 'express'
import { LoanService } from '../services/loanService'
import { LoanCalculationInput } from '../types'

export class LoanController {
    private loanService: LoanService

    constructor() {
        this.loanService = new LoanService()
    }

    calculateLoan = async (req: Request, res: Response): Promise<void> => { // for context
        try {
            const input: LoanCalculationInput = req.body

            if (!this.validateInput(input)) {
                res.status(400).json({ error: 'Invalid input parameters' })
                return
            }

            const calculation = await this.loanService.calculateLoan(input);

            res.json(calculation)
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Internal server error' })
            }
        }
    }

    private validateInput(input: any): input is LoanCalculationInput {
        return (
            typeof input.totalInstallments === 'number' &&
            typeof input.remainingInstallments === 'number' &&
            typeof input.installmentAmount === 'number' &&
            typeof input.financingAmount === 'number' &&
            typeof input.interestRate === 'number' &&
            input.totalInstallments > 0 &&
            input.remainingInstallments > 0 &&
            input.installmentAmount > 0 &&
            input.financingAmount > 0 &&
            input.interestRate > 0
        )
    }
}