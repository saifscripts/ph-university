import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterNameCodeMapper } from './semester.constant';
import { ISemester } from './semester.interface';
import { Semester } from './semester.model';

const createSemesterIntoDB = async (payload: ISemester) => {
    if (SemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(
            httpStatus.UNPROCESSABLE_ENTITY,
            'Semester code mismatched!',
        );
    }

    const newSemester = await Semester.create(payload);
    return newSemester;
};

const getAllSemestersFromDB = async () => {
    const semesters = await Semester.find();
    return semesters;
};

const getSingleSemesterFromDB = async (semesterId: string) => {
    const semester = await Semester.findById(semesterId);

    if (!semester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester not found!');
    }

    return semester;
};

const updateSemesterIntoDB = async (semesterId: string, payload: ISemester) => {
    const { name, code } = payload;

    if (name && code && SemesterNameCodeMapper[name] !== code) {
        throw new AppError(
            httpStatus.UNPROCESSABLE_ENTITY,
            'Semester code mismatched!',
        );
    } else if (!name || !code) {
        throw new AppError(
            httpStatus.UNPROCESSABLE_ENTITY,
            "You can't update only semester name/code! Please update both name and code",
        );
    }

    // handle semester-already-exists

    const updatedSemester = await Semester.findByIdAndUpdate(
        semesterId,
        payload,
        { new: true },
    );

    if (!updatedSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester not found!');
    }

    return updatedSemester;
};

export const SemesterServices = {
    createSemesterIntoDB,
    getAllSemestersFromDB,
    getSingleSemesterFromDB,
    updateSemesterIntoDB,
};
