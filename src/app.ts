import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './config/database'
import loanRoutes from './routes/loanRoutes'
import {checkJwt} from "@/middleware/auth";
import {errorHandler} from "@/middleware/errorHandler";

const app = express()
app.use(express.json())

app.use('/api/loans', checkJwt, loanRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection initialized")

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Error initializing database:", error)
    })

