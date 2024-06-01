import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import config from '../config';
import { IErrorSources } from '../interfaces/errors';

const handleZodError = (err: ZodError) => {
    const errorSources: IErrorSources = err.issues.map((issue) => ({
        path: issue?.path[issue?.path.length - 1],
        message: issue?.message,
    }));

    return {
        statusCode: 400,
        message: 'Validation Error!',
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    };
};

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong!';
    let errorSources: IErrorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    let stack = config.NODE_ENV === 'development' ? err?.stack : null;

    if (err instanceof ZodError) {
        const formattedError = handleZodError(err);

        statusCode = formattedError.statusCode;
        message = formattedError.message;
        errorSources = formattedError.errorSources;
        stack = formattedError.stack;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack,
    });
};

export default globalErrorHandler;
