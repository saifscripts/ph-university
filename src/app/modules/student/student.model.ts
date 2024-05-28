import { Schema, model } from 'mongoose';
import {
    IGuardian,
    ILocalGuardian,
    IStudent,
    IUserName,
} from './student.interface';

const userNameSchema = new Schema<IUserName>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: [20, 'First Name can not be more than 20 characters'],
        },
        middleName: { type: String, trim: true },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: [20, 'Last Name can not be more than 20 characters'],
        },
    },
    {
        _id: false,
    },
);

const guardianSchema = new Schema<IGuardian>(
    {
        fatherName: {
            type: String,
            required: true,
        },
        fatherOccupation: {
            type: String,
            required: true,
        },
        fatherContactNo: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        motherOccupation: {
            type: String,
            required: true,
        },
        motherContactNo: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const localGuardianSchema = new Schema<ILocalGuardian>(
    {
        name: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const studentSchema = new Schema<IStudent>(
    {
        id: { type: String, required: true, unique: true },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'User',
        },
        name: userNameSchema,
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        guardian: guardianSchema,
        localGuardian: localGuardianSchema,
        profileImage: {
            type: String,
            required: true,
        },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Student = model<IStudent>('Student', studentSchema);
