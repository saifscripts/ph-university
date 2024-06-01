import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';

type TErrorSources = {
    path: string | number;
    message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong!';
    const errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];

    if (err instanceof ZodError) {
        errorSources.push({
            path: 'zod',
            message: 'Error from Zod',
        });
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
    });
};

export default globalErrorHandler;
