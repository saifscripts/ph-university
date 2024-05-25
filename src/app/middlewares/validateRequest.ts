import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
    return catchAsync(async (req, _res, next) => {
        req.body = await schema.parseAsync(req.body);
        next();
    });
};

export default validateRequest;
