import { z } from 'zod';
import { StudentValidations } from '../student/student.validation';

const userValidationSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Maximum password length is 20 characters' }),
});

const createStudentValidationSchema = userValidationSchema.merge(
    z.object({
        student: StudentValidations.studentValidationSchema,
    }),
);

export const UserValidations = {
    userValidationSchema,
    createStudentValidationSchema,
};
