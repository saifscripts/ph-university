import { Error } from 'mongoose';
import { IErrorSources } from '../interfaces/errors';

const handleValidationError = (err: Error.ValidationError) => {
    const errorSources: IErrorSources = Object.values(err.errors).map(
        (val: Error.ValidatorError | Error.CastError) => ({
            path: val?.path,
            message: val.message,
        }),
    );

    return {
        statusCode: 400,
        message: 'Validation Error!',
        errorSources,
    };
};

export default handleValidationError;
