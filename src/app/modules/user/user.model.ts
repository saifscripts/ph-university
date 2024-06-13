import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
    {
        id: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: 0 },
        needsPasswordChange: { type: Boolean, default: true },
        passwordChangedAt: { type: Date },
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

userSchema.statics.comparePassword = async function (
    plain: string,
    hashed: string,
) {
    return await bcrypt.compare(plain, hashed);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
    jwtIssuedAt: number,
    passwordChangedAt: Date,
) {
    const passwordChangeTimeStamp = new Date(passwordChangedAt).getTime();
    const jwtIssueTimeStamp = jwtIssuedAt * 1000;

    return passwordChangeTimeStamp > jwtIssueTimeStamp;
};

export const User = model<IUser, UserModel>('User', userSchema);
