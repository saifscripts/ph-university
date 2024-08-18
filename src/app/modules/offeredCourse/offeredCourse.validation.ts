import { z } from 'zod';
import { ObjectId } from '../../validations';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
    (time: string) => {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(time);
    },
    {
        message: 'Invalid time format. Expected HH:MM in 24 hours format.',
    },
);

export const createOfferedCourseValidationSchema = z.object({
    body: z
        .object({
            semesterRegistration: ObjectId,
            academicFaculty: ObjectId,
            academicDepartment: ObjectId,
            course: ObjectId,
            faculty: ObjectId,
            maxCapacity: z.number(),
            section: z.number(),
            days: z.array(z.enum(Days)),
            startTime: timeStringSchema,
            endTime: timeStringSchema,
        })
        .refine(
            (body) => {
                const startTime = new Date(`1970-01-01T${body.startTime}`);
                const endTime = new Date(`1970-01-01T${body.endTime}`);
                return endTime > startTime;
            },
            {
                message: 'Start time should be smaller then end time.',
            },
        ),
});

export const updateOfferedCourseValidationSchema = z.object({
    body: z
        .object({
            faculty: ObjectId,
            maxCapacity: z.number(),
            days: z.array(z.enum(Days)),
            startTime: timeStringSchema,
            endTime: timeStringSchema,
        })
        .refine(
            (body) => {
                const startTime = new Date(`1970-01-01T${body.startTime}`);
                const endTime = new Date(`1970-01-01T${body.endTime}`);
                return endTime > startTime;
            },
            {
                message: 'Start time should be smaller then end time.',
            },
        ),
});

export const OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
