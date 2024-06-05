import mongoose from 'mongoose';
import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

export const semesterRegistrationValidationSchema = z.object({
    semester: z
        .string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId',
        }),
    status: z.enum(SemesterRegistrationStatus).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().int().min(3).max(15).optional(),
    maxCredit: z.number().int().min(3).max(15).optional(),
});

export const SemesterRegistrationValidations = {
    semesterRegistrationValidationSchema,
};
