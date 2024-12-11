import { Request, Response } from 'express'
import { LoanService } from '../services/loanService'

export class LoanController {
    private loanService: LoanService

    constructor() {
        this.loanService = new LoanService();
    }

    async calculateLoan(req: Request, res: Response): Promise<void> {
        try {
            const calculation = await this.loanService.calculateLoan(req.body);
            res.json(calculation);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}