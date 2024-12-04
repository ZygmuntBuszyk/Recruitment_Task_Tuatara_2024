import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        });
    }

    return res.status(500).json({
        error: 'Internal server error'
    });
};