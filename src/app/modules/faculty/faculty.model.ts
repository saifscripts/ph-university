import { Schema, model } from 'mongoose';
import { userNameSchema } from '../user/user.model';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty, FacultyModel>(
    {
        id: { type: String, required: true, unique: true },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'User',
        },
        name: userNameSchema,
        designation: {
            type: String,
            required: true,
        },
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
        profileImage: {
            type: String,
            required: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
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
facultySchema.virtual('fullName').get(function () {
    return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
facultySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

facultySchema.pre('findOne', function (next) {
    if (this.getOptions().getDeletedFaculties) {
        return next();
    }

    this.find({ isDeleted: { $ne: true } });
    next();
});

facultySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
facultySchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Faculty.findOne({ id });
    return existingUser;
};

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
