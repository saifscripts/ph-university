import { z } from 'zod';
import { ObjectId } from '../../validations';
import { Days } from './offeredCourse.constant';

const isValidTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
};

export const createOfferedCourseValidationSchema = z
    .object({
        semesterRegistration: ObjectId,
        academicFaculty: ObjectId,
        academicDepartment: ObjectId,
        course: ObjectId,
        faculty: ObjectId,
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum(Days)),
        startTime: z.string().refine(isValidTime, {
            message: 'Invalid time format. Expected HH:MM in 24 hours format.',
        }),
        endTime: z.string().refine(isValidTime, {
            message: 'Invalid time format. Expected HH:MM in 24 hours format.',
        }),
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
    );

export const OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
};
