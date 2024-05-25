import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
    err: { statusCode: number; message: string; error?: object },
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong!';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};

export default globalErrorHandler;
