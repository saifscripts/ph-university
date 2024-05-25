import { z } from 'zod';
import { Months, SemesterCode, SemesterName } from './semester.constant';

const createSemesterValidationSchema = z.object({
    name: z.enum(SemesterName),
    code: z.enum(SemesterCode),
    year: z.string(),
    startMonth: z.enum(Months),
    endMonth: z.enum(Months),
});

export const SemesterValidations = {
    createSemesterValidationSchema,
};
