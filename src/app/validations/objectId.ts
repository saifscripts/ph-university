import mongoose from 'mongoose';
import { z } from 'zod';

export const ObjectId = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
    });
