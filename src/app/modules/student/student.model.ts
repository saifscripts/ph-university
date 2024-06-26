import { Schema, model } from 'mongoose';
import {
    IGuardian,
    ILocalGuardian,
    IStudent,
    IUserName,
    StudentModel,
} from './student.interface';

export const userNameSchema = new Schema<IUserName>(
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

const studentSchema = new Schema<IStudent, StudentModel>(
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
            unique: true,
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
        semester: {
            type: Schema.Types.ObjectId,
            ref: 'Semester',
            required: true,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
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

// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    if (this.getOptions().getDeletedStudents) {
        return next();
    }

    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
