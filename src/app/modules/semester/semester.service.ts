import { SemesterNameCodeMapper } from './semester.constant';
import { ISemester } from './semester.interface';
import { Semester } from './semester.model';

const createSemesterIntoDB = async (payload: ISemester) => {
    if (SemesterNameCodeMapper[payload.name] !== payload.code) {
        throw Error('Semester code mismatched!');
    }

    const newSemester = await Semester.create(payload);
    return newSemester;
};

export const SemesterServices = {
    createSemesterIntoDB,
};
