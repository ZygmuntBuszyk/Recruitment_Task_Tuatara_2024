import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('calculations')
export class Calculation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    totalInstallments!: number

    @Column("int")
    remainingInstallments!: number

    @Column("decimal", { precision: 10, scale: 2 })
    installmentAmount!: number

    @Column("decimal", { precision: 10, scale: 2 })
    financingAmount!: number

    @Column("decimal", { precision: 5, scale: 2 })
    interestRate!: number

    @Column("decimal", { precision: 5, scale: 2 })
    referenceRate!: number

    @Column({ type: 'timestamp' })
    referenceRateDate!: Date

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    remainingAmount?: number

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    newInstallmentAmount?: number

    @CreateDateColumn()
    createdAt!: Date
}