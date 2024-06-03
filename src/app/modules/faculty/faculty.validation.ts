import { z } from 'zod';
import { userNameValidationSchema } from '../user/user.validation';

const facultyValidationSchema = z.object({
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
});

export const FacultyValidations = {
    facultyValidationSchema,
};
