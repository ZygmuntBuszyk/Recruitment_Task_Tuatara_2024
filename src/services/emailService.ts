import nodemailer from 'nodemailer';
import {Calculation} from "@/entities/Calculation.entity";

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendNegativeInstallmentAlert(calculation: Calculation) {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_TO,
                subject: 'Negative Installment Amount',
                html: `
                    <h2>Negative Installment Amount</h2>
                    <p>A calculation resulted in a negative installment amount:</p>
                    <ul>
                        <li>Calculation ID: ${calculation.id}</li>
                        <li>New Installment Amount: ${calculation.newInstallmentAmount}</li>
                        <li>Reference Rate: ${calculation.referenceRate}%</li>
                        <li>Interest Rate: ${calculation.interestRate}%</li>
                        <li>Remaining Amount: ${calculation.remainingAmount}</li>
                        <li>Remaining Installments: ${calculation.remainingInstallments}</li>
                        <li>Date: ${calculation.createdAt.toLocaleString()}</li>
                    </ul>
                `
            });
            console.log('Alert email sent successfully');
        } catch (error) {
            console.error('Failed to send alert email:', error);
        }
    }
}