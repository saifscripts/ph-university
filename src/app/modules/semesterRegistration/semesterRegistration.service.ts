import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { Semester } from '../semester/semester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
    payload: ISemesterRegistration,
) => {
    const semester = payload.semester;

    // check if semester exists
    const isSemesterExists = await Semester.findById(semester);

    if (!isSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester doesn't exist!");
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

    // check if there is any UPCOMING or ONGOING semester
    const isThereAnyUpcomingOrOngoingSemester =
        await SemesterRegistration.findOne({
            status: {
                $in: [RegistrationStatus.UPCOMING, RegistrationStatus.ONGOING],
            },
        });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester exists`,
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

const updateSemesterRegistrationIntoDB = async (
    id: string,
    payload: Partial<ISemesterRegistration>,
) => {
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

    // check if semester registration exists
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Semester registration not found!',
        );
    }

    const currentSemesterStatus = isSemesterRegistrationExist?.status;
    const requestedSemesterStatus = payload?.status;

    // An 'ended' semester registration cannot be updated
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Semester registration is already ENDED!',
        );
    }

    // An 'upcoming' semester registration status cannot be updated as 'ended'
    if (
        currentSemesterStatus === RegistrationStatus.UPCOMING &&
        requestedSemesterStatus === RegistrationStatus.ENDED
    ) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'You cannot update an UPCOMING semester to ENDED Semester!',
        );
    }

    // An 'ongoing' semester registration status cannot be updated as 'upcoming'
    if (
        currentSemesterStatus === RegistrationStatus.ONGOING &&
        requestedSemesterStatus === RegistrationStatus.UPCOMING
    ) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'You cannot update an ONGOING semester to UPCOMING Semester!',
        );
    }

    const results = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return results;
};

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
    updateSemesterRegistrationIntoDB,
    // deleteSemesterRegistrationFromDB,
};
