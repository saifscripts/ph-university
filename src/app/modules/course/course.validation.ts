import mongoose from 'mongoose';
import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
    course: z
        .string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId',
        }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
    course: z
        .string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId',
        }),
    isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
        .array(createPreRequisiteCourseValidationSchema)
        .optional(),
});

const updateCourseValidationSchema = z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
        .array(updatePreRequisiteCourseValidationSchema)
        .optional(),
});

const courseFacultyValidationSchema = z.object({
    faculties: z.array(
        z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId',
        }),
    ),
});

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    courseFacultyValidationSchema,
};
