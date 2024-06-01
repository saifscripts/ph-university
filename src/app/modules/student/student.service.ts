import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
    const students = await Student.find().select('id semester isDeleted');
    // .populate('semester')
    // .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty',
    //     },
    // });

    if (!students.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No student found!');
    }

    return students;
};

const getSingleStudentFromDB = async (id: string) => {
    const student = await Student.findOne({ id })
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

const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
    const { name, guardian, localGuardian, ...remainingData } = payload;

    const modifiedData: Record<string, unknown> = {
        ...remainingData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedData[`localGuardian.${key}`] = value;
        }
    }

    const updatedStudent = await Student.findOneAndUpdate(
        { id },
        modifiedData,
        {
            new: true,
        },
    );

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
