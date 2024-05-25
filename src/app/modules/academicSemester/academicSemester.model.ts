import { Schema, model } from 'mongoose';
import { IAcademicSemester, Month } from './academicSemester.interface';

const monthSchema = new Schema<Month>(
    {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        required: true,
    },
    {
        _id: false,
    },
);

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        name: {
            type: String,
            enum: ['Autumn', 'Summer', 'Fall'],
            required: true,
        },
        year: {
            type: Date,
            required: true,
        },
        code: {
            type: String,
            enum: ['01', '02', '03'],
            required: true,
        },
        startMonth: monthSchema,
        endMonth: monthSchema,
    },
    {
        timestamps: true,
    },
);

export const AcademicSemester = model<IAcademicSemester>(
    'AcademicSemester',
    academicSemesterSchema,
);
