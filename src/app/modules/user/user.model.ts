import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    status: { type: String, enum: ['in-progress', 'blocked'], required: true },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true,
    },
    isDeleted: { type: Boolean, required: true },
});

export const User = model<IUser>('User', userSchema);
