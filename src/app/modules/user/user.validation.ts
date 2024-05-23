import { z } from 'zod';

export const userValidationSchema = z.object({
    id: z.string(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Maximum password length is 20 characters' }),
    needsPasswordChange: z.boolean().default(true),
    status: z
        .enum(['in-progress', 'blocked'], {
            invalid_type_error: '{value} {VALUE} is invalid',
        })
        .default('in-progress'),
    role: z.enum(['student', 'faculty', 'admin']),
    isDeleted: z.boolean().default(false),
});
