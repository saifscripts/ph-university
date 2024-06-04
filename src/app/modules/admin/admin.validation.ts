import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string({
        required_error: 'First Name is required',
    }),
    middleName: z.string().optional(),
    lastName: z.string(),
});

const adminValidationSchema = z.object({
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
    managementDepartment: z.string(),
});

export const AdminValidations = {
    adminValidationSchema,
};
