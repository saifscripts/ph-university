import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../errors/AppError';
import { IAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
});

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    });

    if (isDepartmentExist) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Academic Department already exists!',
        );
    }

    next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const isDepartmentExist: IAcademicDepartment | null =
        await AcademicDepartment.findOne(this.getQuery());

    if (!isDepartmentExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic Department does not exist!',
        );
    }

    next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
