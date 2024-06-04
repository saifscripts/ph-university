import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { ICourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: ICourse) => {
    const course = await Course.create(payload);
    return course;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const courses = await courseQuery.modelQuery;

    if (!courses.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Course found!');
    }

    return courses;
};

const getSingleCourseFromDB = async (id: string) => {
    const course = await Course.findById(id).populate(
        'preRequisiteCourses.course',
    );

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
    }

    return course;
};

const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
    const updatedCourse = await Course.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!updatedCourse) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
    }

    return updatedCourse;
};

const deleteCourseFromDB = async (id: string) => {
    const deletedCourse = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );

    if (!deletedCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Course!');
    }

    return deletedCourse;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
};
