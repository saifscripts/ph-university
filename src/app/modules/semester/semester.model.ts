import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../errors/AppError';
import { Months, SemesterCode, SemesterName } from './semester.constant';
import { ISemester } from './semester.interface';

const semesterSchema = new Schema<ISemester>(
    {
        name: {
            type: String,
            enum: SemesterName,
            required: true,
        },
        code: {
            type: String,
            enum: SemesterCode,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            enum: Months,
            required: true,
        },
        endMonth: {
            type: String,
            enum: Months,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// check if a semester already exists
semesterSchema.pre('save', async function (next) {
    const isSemesterExists = await Semester.findOne({
        name: this.name,
        year: this.year,
    });

    if (isSemesterExists) {
        throw new AppError(httpStatus.CONFLICT, 'Semester already exists!');
    }

    next();
});

export const Semester = model<ISemester>('Semester', semesterSchema);
