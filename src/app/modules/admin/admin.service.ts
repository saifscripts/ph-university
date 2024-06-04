import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { AdminSearchableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(
        Admin.find(),
        // .populate('semester')
        // .populate({
        //     path: 'academicDepartment',
        //     populate: {
        //         path: 'academicFaculty',
        //     },
        // }),
        query,
    )
        .search(AdminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const admins = await adminQuery.modelQuery;

    if (!admins.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Admin found!');
    }

    return admins;
};

const getSingleAdminFromDB = async (id: string) => {
    const admin = await Admin.findOne({ id });
    // .populate('semester')
    // .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //         path: 'academicFaculty',
    //     },
    // });

    if (!admin) {
        throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
    }

    return admin;
};

const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
    const { name, ...remainingData } = payload;

    const modifiedData: Record<string, unknown> = {
        ...remainingData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }

    const updatedAdmin = await Admin.findOneAndUpdate({ id }, modifiedData, {
        new: true,
    });

    if (!updatedAdmin) {
        throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
    }

    return updatedAdmin;
};

const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedAdmin = await Admin.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedAdmin) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete Admin!',
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

        return deletedAdmin;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
};
