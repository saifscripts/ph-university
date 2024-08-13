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
        section,
        course,
        faculty,
        days,
        startTime,
        endTime,
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

    // check if academicDepartment belongs to the given academicFaculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    });

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `${isAcademicDepartmentExists.name} doesn't belong to ${isAcademicFacultyExists.name}!`,
        );
    }

    // check if same offered course already exists for the same section and registered semester
    const isOfferedCourseExists = await OfferedCourse.findOne({
        semesterRegistration,
        section,
        course,
    });

    if (isOfferedCourseExists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Offered course with the same section already exists!',
        );
    }

    // get the schedules of the faculty of this semester registration
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');

    const newStartTime = new Date(`1970-01-01T${startTime}`);
    const newEndTime = new Date(`1970-01-01T${endTime}`);

    assignedSchedules.forEach((schedule) => {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);

        // check if the time conflicts between existing time and new time
        if (newEndTime > existingStartTime && existingEndTime > newStartTime) {
            throw new AppError(
                httpStatus.CONFLICT,
                'Faculty is not available for this schedule!',
            );
        }
    });

    const semester = isSemesterRegistrationExists.semester;
    const result = await OfferedCourse.create({ ...payload, semester });
    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
};
