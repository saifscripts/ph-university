import { Schema, model } from 'mongoose';
import { ICourse, IPreRequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema<IPreRequisiteCourse>({
    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

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

export const Course = model<ICourse>('Course', courseSchema);
