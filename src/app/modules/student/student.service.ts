import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    const searchTerm = (query?.searchTerm as string) || '';
    const searchFields = [
        'name.firstName',
        'name.middleName',
        'name.lastName',
        'presentAddress',
    ];
    const searchQuery = Student.find({
        $or: searchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });

    const _query = { ...query };
    excludeFields.forEach((field) => delete _query[field]);
    const filterQuery = searchQuery.find(_query);
    // .populate('semester')
    // .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty',
    //     },
    // });

    let sort = query.sort ? (query.sort as string) : '-createdAt';
    const sortQuery = filterQuery.sort(sort);

    let limit = query.limit ? Number(query.limit) : 10;
    let page = query.page ? Number(query.page) : 1;
    let skip = query.page ? (page - 1) * limit : 0;
    const paginateQuery = sortQuery.skip(skip).limit(limit);

    const fields = query?.fields
        ? (query.fields as string).split(',').join(' ')
        : '-__v';
    const fieldQuery = paginateQuery.select(fields);

    const students = await fieldQuery;
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
