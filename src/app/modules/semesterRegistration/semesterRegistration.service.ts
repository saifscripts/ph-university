import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { Semester } from '../semester/semester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
    payload: ISemesterRegistration,
) => {
    const semester = payload.semester;

    // check if semester exists
    const isSemesterExists = await Semester.findById(semester);

    if (!isSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'No semester found!');
    }

    // check if semester is already registered
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({
        semester,
    });

    if (isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Semester is already registered!',
        );
    }

    const result = await SemesterRegistration.create(payload);
    return result;
};

const getAllSemesterRegistrationsFromDB = async (
    query: Record<string, unknown>,
) => {
    const SemesterRegistrationQuery = new QueryBuilder(
        SemesterRegistration.find().populate('semester'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const semesterRegistrations = await SemesterRegistrationQuery.modelQuery;

    if (!semesterRegistrations.length) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No semester registration found!',
        );
    }

    return semesterRegistrations;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const semesterRegistration =
        await SemesterRegistration.findById(id).populate('semester');

    if (!semesterRegistration) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester registration not found!',
        );
    }

    return semesterRegistration;
};

// const updateSemesterRegistrationIntoDB = async (
//     id: string,
//     payload: Partial<ISemesterRegistration>,
// ) => {
//     const {
//         preRequisiteSemesterRegistrations,
//         ...remainingSemesterRegistrationData
//     } = payload;

//     const session = await mongoose.startSession();

//     try {
//         session.startTransaction();
//         // update remaining SemesterRegistration data
//         const updatedSemesterRegistrationData =
//             await SemesterRegistration.findByIdAndUpdate(
//                 id,
//                 remainingSemesterRegistrationData,
//             );

//         if (!updatedSemesterRegistrationData) {
//             throw new AppError(
//                 httpStatus.BAD_REQUEST,
//                 'Failed to update SemesterRegistration!',
//             );
//         }

//         // delete and add prerequisite SemesterRegistrations
//         if (
//             preRequisiteSemesterRegistrations &&
//             preRequisiteSemesterRegistrations.length
//         ) {
//             const deletePreRequisiteSemesterRegistrations =
//                 preRequisiteSemesterRegistrations
//                     .filter((el) => el.SemesterRegistration && el.isDeleted)
//                     .map((el) => el.SemesterRegistration);

//             const isPreRequisiteSemesterRegistrationsDeleted =
//                 await SemesterRegistration.findByIdAndUpdate(
//                     id,
//                     {
//                         $pull: {
//                             preRequisiteSemesterRegistrations: {
//                                 SemesterRegistration: {
//                                     $in: deletePreRequisiteSemesterRegistrations,
//                                 },
//                             },
//                         },
//                     },
//                     { new: true },
//                 );

//             if (!isPreRequisiteSemesterRegistrationsDeleted) {
//                 throw new AppError(
//                     httpStatus.BAD_REQUEST,
//                     'Failed to delete pre-requisite SemesterRegistrations!',
//                 );
//             }

//             const updatePreRequisites =
//                 preRequisiteSemesterRegistrations.filter(
//                     (el) => el.SemesterRegistration && !el.isDeleted,
//                 );

//             const isPreRequisiteSemesterRegistrationsAdded =
//                 await SemesterRegistration.findByIdAndUpdate(
//                     id,
//                     {
//                         $addToSet: {
//                             preRequisiteSemesterRegistrations: {
//                                 $each: updatePreRequisites,
//                             },
//                         },
//                     },
//                     { new: true },
//                 );

//             if (!isPreRequisiteSemesterRegistrationsAdded) {
//                 throw new AppError(
//                     httpStatus.BAD_REQUEST,
//                     'Failed to add pre-requisite SemesterRegistrations!',
//                 );
//             }
//         }

//         const updatedSemesterRegistration = await SemesterRegistration.findById(
//             id,
//         ).populate('preRequisiteSemesterRegistrations.SemesterRegistration');

//         await session.commitTransaction();
//         session.endSession();

//         return updatedSemesterRegistration;
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         throw error;
//     }
// };

// const deleteSemesterRegistrationFromDB = async (id: string) => {
//     const deletedSemesterRegistration =
//         await SemesterRegistration.findByIdAndUpdate(
//             id,
//             { isDeleted: true },
//             { new: true },
//         );

//     if (!deletedSemesterRegistration) {
//         throw new AppError(
//             httpStatus.BAD_REQUEST,
//             'Failed to delete SemesterRegistration!',
//         );
//     }

//     return deletedSemesterRegistration;
// };

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    // updateSemesterRegistrationIntoDB,
    // deleteSemesterRegistrationFromDB,
};
