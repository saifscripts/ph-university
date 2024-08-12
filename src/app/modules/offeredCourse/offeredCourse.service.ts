import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
    const result = await OfferedCourse.create(payload);
    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
};
