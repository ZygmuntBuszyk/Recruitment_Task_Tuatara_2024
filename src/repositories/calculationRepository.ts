import { Repository } from "typeorm"
import { AppDataSource } from "../config/database"
import { Calculation } from "../entities/Calculation.entity"

export class CalculationRepository {
    private repository: Repository<Calculation>

    constructor() {
        this.repository = AppDataSource.getRepository(Calculation)
    }

    async save(calculation: Partial<Calculation>): Promise<Calculation> {
        return await this.repository.save(calculation)
    }
}