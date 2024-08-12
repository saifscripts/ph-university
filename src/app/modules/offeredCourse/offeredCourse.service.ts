import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty,
    } = payload;

    // check if semesterRegistration id exists
    const isSemesterRegistrationExists =
        await SemesterRegistration.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Semester registration doesn't exist!",
        );
    }

    // check if academicFaculty id exists
    const isAcademicFacultyExists =
        await AcademicFaculty.findById(academicFaculty);

    if (!isAcademicFacultyExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Academic faculty doesn't exist!",
        );
    }

    // check if academicDepartment id exists
    const isAcademicDepartmentExists =
        await AcademicDepartment.findById(academicDepartment);

    if (!isAcademicDepartmentExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Academic department doesn't exist!",
        );
    }

    //  check if course id exists
    const isCourseExists = await Course.findById(course);

    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Course doesn't exist!");
    }

    // check if faculty id exists
    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Faculty doesn't exist!");
    }

    const semester = isSemesterRegistrationExists.semester;
    const result = await OfferedCourse.create({ ...payload, semester });
    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
};
