import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
        invalid_type_error: 'Academic Faculty must be a string',
    }),
});

export const AcademicDepartmentValidations = {
    academicDepartmentValidationSchema,
};
