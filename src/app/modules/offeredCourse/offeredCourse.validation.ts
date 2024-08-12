import { z } from 'zod';
import { ObjectId } from '../../validations';
import { Days } from './offeredCourse.constant';

export const createOfferedCourseValidationSchema = z.object({
    semesterRegistration: ObjectId,
    academicFaculty: ObjectId,
    academicDepartment: ObjectId,
    course: ObjectId,
    faculty: ObjectId,
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(Days)),
    startTime: z.string(),
    endTime: z.string(),
});

export const OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
};
