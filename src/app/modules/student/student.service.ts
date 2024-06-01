import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
    const students = await Student.find()
        .populate('semester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    if (!students.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No student found!');
    }

    return students;
};

const getSingleStudentFromDB = async (studentId: string) => {
    const student = await Student.findById(studentId)
        .populate('semester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
    }

    return student;
};

const updateStudentIntoDB = async (studentId: string, payload: IStudent) => {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, payload, {
        new: true,
    });

    if (!updatedStudent) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
    }

    return updatedStudent;
};

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete student!',
            );
        }

        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete user!',
            );
        }

        await session.commitTransaction();
        session.endSession();

        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
};
