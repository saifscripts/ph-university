import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

academicFacultySchema.pre('save', async function (next) {
    const isFacultyExist = await AcademicFaculty.findOne({
        name: this.name,
    });

    if (isFacultyExist) {
        throw Error('Academic Faculty already exists!');
    }

    next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
    const isFacultyExist: IAcademicFaculty | null =
        await AcademicFaculty.findOne(this.getQuery());

    if (!isFacultyExist) {
        throw Error('Academic Faculty does not exist!');
    }

    next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
    'AcademicFaculty',
    academicFacultySchema,
);
