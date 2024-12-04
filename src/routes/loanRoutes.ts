import { Router } from 'express'
import {LoanController} from "@/controllers/LoanController";

const router = Router()
const loanController = new LoanController()

router.post('/calculate', loanController.calculateLoan)

export default router