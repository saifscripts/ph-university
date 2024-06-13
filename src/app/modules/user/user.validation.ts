import { z } from 'zod';
import { AdminValidations } from '../admin/admin.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { StudentValidations } from '../student/student.validation';

const userValidationSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Maximum password length is 20 characters' }),
});

const createStudentValidationSchema = z.object({
    body: userValidationSchema.merge(
        z.object({
            student: StudentValidations.studentValidationSchema,
        }),
    ),
});

const createFacultyValidationSchema = z.object({
    body: userValidationSchema.merge(
        z.object({
            faculty: FacultyValidations.facultyValidationSchema,
        }),
    ),
});

const createAdminValidationSchema = z.object({
    body: userValidationSchema.merge(
        z.object({
            admin: AdminValidations.adminValidationSchema,
        }),
    ),
});

export const UserValidations = {
    userValidationSchema,
    createStudentValidationSchema,
    createFacultyValidationSchema,
    createAdminValidationSchema,
};
