import { Router } from 'express'
import {LoanController} from "@/controllers/LoanController";
import {validateRequest} from "@/middleware/validation";
import {LoanCalculationSchema} from "@/types/loanCalculationSchema";

const router = Router()
const loanController = new LoanController()

router.post(
    '/calculate',
    validateRequest(LoanCalculationSchema),
    (req, res) => loanController.calculateLoan(req, res)
);

export default router