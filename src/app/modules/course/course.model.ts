import { Schema, model } from 'mongoose';
import {
    ICourse,
    ICourseFaculty,
    IPreRequisiteCourse,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<IPreRequisiteCourse>(
    {
        course: {
            type: Schema.ObjectId,
            ref: 'Course',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// Query Middleware
courseSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

courseSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

courseSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

export const Course = model<ICourse>('Course', courseSchema);

const courseFacultySchema = new Schema<ICourseFaculty>({
    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true,
        unique: true,
    },
    faculties: [
        {
            type: Schema.ObjectId,
            ref: 'Faculty',
        },
    ],
});

export const CourseFaculty = model<ICourseFaculty>(
    'CourseFaculty',
    courseFacultySchema,
);
