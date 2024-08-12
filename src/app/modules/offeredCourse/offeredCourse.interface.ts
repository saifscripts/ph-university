import mongoose from 'mongoose';
import { Days } from './offeredCourse.constant';

export interface IOfferedCourse {
    semesterRegistration: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    academicFaculty: mongoose.Types.ObjectId;
    academicDepartment: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    faculty: mongoose.Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: (typeof Days)[number];
    startTime: string;
    endTime: string;
}
