import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { RegistrationStatus } from '../semesterRegistration/semesterRegistration.constant';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import hasTimeConflict from './offeredCourse.utils';

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
    }).select('startTime endTime');

    const newSchedule = { startTime, endTime };

    // check if there's time conflicts
    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Faculty is not available for this schedule!',
        );
    }

    // create offered course
    const semester = isSemesterRegistrationExists.semester;
    const result = await OfferedCourse.create({ ...payload, semester });
    return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const OfferedCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const offeredCourses = await OfferedCourseQuery.modelQuery;

    if (!offeredCourses.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No offered course found!');
    }

    return offeredCourses;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);

    if (!offeredCourse) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
    }

    return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
    id: string,
    payload: Pick<
        IOfferedCourse,
        'faculty' | 'maxCapacity' | 'days' | 'startTime' | 'endTime'
    >,
) => {
    const { faculty, days, startTime, endTime } = payload;

    // check if same offered course exists
    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Offered course doesn't exists!",
        );
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    // check if semesterRegistration status is UPCOMING
    const semesterRegistrationStatus = (
        await SemesterRegistration.findById(semesterRegistration)
    )?.status;

    if (semesterRegistrationStatus !== RegistrationStatus.UPCOMING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can't update an offered course for an ${semesterRegistrationStatus} semester!`,
        );
    }

    // check if faculty id exists
    const isFacultyExists = await Faculty.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Faculty doesn't exist!");
    }

    // get the schedules of the faculty of this semester registration
    const assignedSchedules = await OfferedCourse.find({
        _id: { $ne: id },
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('startTime endTime');

    const newSchedule = { startTime, endTime };

    // check if there's time conflicts
    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            'Faculty is not available for this schedule!',
        );
    }

    // update offered course
    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Offered course doesn't exist!",
        );
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus = (
        await SemesterRegistration.findById(semesterRegistration)
    )?.status;

    if (semesterRegistrationStatus !== RegistrationStatus.UPCOMING) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can't delete an offered course of an ${semesterRegistrationStatus} registered semester!`,
        );
    }

    const result = await OfferedCourse.findByIdAndDelete(id);
    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
    deleteOfferedCourseFromDB,
};
