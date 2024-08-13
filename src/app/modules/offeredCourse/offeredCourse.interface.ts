import mongoose from 'mongoose';
import { Days } from './offeredCourse.constant';

type IDay = (typeof Days)[number];

export interface IOfferedCourse {
    semesterRegistration: mongoose.Types.ObjectId;
    semester: mongoose.Types.ObjectId;
    academicFaculty: mongoose.Types.ObjectId;
    academicDepartment: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    faculty: mongoose.Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: IDay[];
    startTime: string;
    endTime: string;
}

export interface ISchedule {
    startTime: string;
    endTime: string;
}
