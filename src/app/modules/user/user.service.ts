import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Semester } from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateId } from './user.util';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
    const admissionSemester = await Semester.findById(payload.semester);

    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester not found!');
    }

    const userData: Partial<IUser> = {
        id: await generateId(admissionSemester),
        password: password || (config.default_password as string),
        role: 'student',
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        const newStudent = await Student.create({
            ...payload,
            id: newUser[0].id,
            user: newUser[0]._id,
        });

        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};

export const UserServices = {
    createStudentIntoDB,
};
