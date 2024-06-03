import { z } from 'zod';
import { StudentValidations } from '../student/student.validation';

// will be used in student, faculty and admin module
export const userNameValidationSchema = z.object({
    firstName: z.string({
        required_error: 'First Name is required',
    }),
    middleName: z.string().optional(),
    lastName: z.string(),
});

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

// const createFacultyValidationSchema = userValidationSchema.merge(
//     z.object({
//         faculty: FacultyValidations?.facultyValidationSchema,
//     }),
// );

const createFacultyValidationSchema = userValidationSchema.merge(
    z.object({
        faculty: z.object({
            name: userNameValidationSchema,
            designation: z.string(),
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImage: z.string().url(),
            academicFaculty: z.string(),
            academicDepartment: z.string(),
        }),
    }),
);

export const UserValidations = {
    userValidationSchema,
    createStudentValidationSchema,
    createFacultyValidationSchema,
};
