import mongoose from 'mongoose';
import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
    course: z
        .string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId',
        }),
});

const courseValidationSchema = z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
});

export const CourseValidations = {
    courseValidationSchema,
};
