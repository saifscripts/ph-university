import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(
        Faculty.find(),
        // .populate('semester')
        // .populate({
        //     path: 'academicDepartment',
        //     populate: {
        //         path: 'academicFaculty',
        //     },
        // }),
        query,
    )
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const faculties = await facultyQuery.modelQuery;

    if (!faculties.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Faculty found!');
    }

    return faculties;
};

const getSingleFacultyFromDB = async (id: string) => {
    const faculty = await Faculty.findOne({ id });
    // .populate('semester')
    // .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty',
    //     },
    // });

    if (!faculty) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }

    return faculty;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
    const { name, ...remainingData } = payload;

    const modifiedData: Record<string, unknown> = {
        ...remainingData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }

    const updatedFaculty = await Faculty.findOneAndUpdate(
        { id },
        modifiedData,
        {
            new: true,
        },
    );

    if (!updatedFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }

    return updatedFaculty;
};

const deleteFacultyFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedFaculty = await Faculty.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedFaculty) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete Faculty!',
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

        return deletedFaculty;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const FacultyServices = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
};
