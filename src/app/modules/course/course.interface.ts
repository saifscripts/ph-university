import mongoose from 'mongoose';

export interface IPreRequisiteCourse {
    course: mongoose.Types.ObjectId;
    isDeleted: boolean;
}

export interface ICourse {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses?: IPreRequisiteCourse[];
    isDeleted: boolean;
}

export interface ICourseFaculty {
    course: mongoose.Types.ObjectId;
    faculties: mongoose.Types.ObjectId[];
}
