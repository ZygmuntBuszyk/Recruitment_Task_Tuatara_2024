import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: z.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Validation error',
                    details: error.errors
                });
            }
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    };
};