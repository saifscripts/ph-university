import mongoose, { Model, Schema } from 'mongoose';
import { Days } from './offeredCourse.constant';
import { IOfferedCourse } from './offeredCourse.interface';

const OfferedCourseSchema: Schema = new Schema<IOfferedCourse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            ref: 'SemesterRegistration',
            required: true,
        },
        semester: {
            type: Schema.Types.ObjectId,
            ref: 'Semester',
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
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true,
        },
        maxCapacity: { type: Number, required: true },
        section: { type: Number, required: true },
        days: [{ type: String, enum: Days }],
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    { timestamps: true },
);

export const OfferedCourse: Model<IOfferedCourse> =
    mongoose.model<IOfferedCourse>('OfferedCourse', OfferedCourseSchema);
