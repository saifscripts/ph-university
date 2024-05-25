import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        id: { type: String, required: true },
        password: { type: String, required: true },
        needsPasswordChange: { type: Boolean, default: true },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        role: {
            type: String,
            enum: ['student', 'faculty', 'admin'],
            required: true,
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next();
});

export const User = model<IUser>('User', userSchema);
