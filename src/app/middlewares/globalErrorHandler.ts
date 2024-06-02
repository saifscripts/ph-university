import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { IErrorSources } from '../interfaces/errors';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong!';
    let errorSources: IErrorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];

    if (err instanceof ZodError) {
        const formattedError = handleZodError(err);
        statusCode = formattedError.statusCode;
        message = formattedError.message;
        errorSources = formattedError.errorSources;
    } else if (err instanceof mongoose.Error.ValidationError) {
        const formattedError = handleValidationError(err);
        statusCode = formattedError.statusCode;
        message = formattedError.message;
        errorSources = formattedError.errorSources;
    } else if (err instanceof mongoose.Error.CastError) {
        const formattedError = handleCastError(err);
        statusCode = formattedError.statusCode;
        message = formattedError.message;
        errorSources = formattedError.errorSources;
    } else if (err?.code === 11000) {
        const formattedError = handleDuplicateError(err);
        statusCode = formattedError.statusCode;
        message = formattedError.message;
        errorSources = formattedError.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
