import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin, IUserName } from './admin.interface';

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

const adminSchema = new Schema<IAdmin, AdminModel>(
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
        managementDepartment: {
            type: String,
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
adminSchema.virtual('fullName').get(function () {
    return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
adminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

adminSchema.pre('findOne', function (next) {
    if (this.getOptions().getDeletedAdmins) {
        return next();
    }

    this.find({ isDeleted: { $ne: true } });
    next();
});

adminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
adminSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Admin.findOne({ id });
    return existingUser;
};

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
