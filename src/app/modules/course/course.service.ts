import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

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
    const { preRequisiteCourses, ...remainingCourseData } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // update remaining course data
        const updatedCourseData = await Course.findByIdAndUpdate(
            id,
            remainingCourseData,
        );

        if (!updatedCourseData) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update course!',
            );
        }

        // delete and add prerequisite courses
        if (preRequisiteCourses && preRequisiteCourses.length) {
            const deletePreRequisiteCourses = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const isPreRequisiteCoursesDeleted = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletePreRequisiteCourses },
                        },
                    },
                },
                { new: true },
            );

            if (!isPreRequisiteCoursesDeleted) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to delete pre-requisite courses!',
                );
            }

            const updatePreRequisites = preRequisiteCourses.filter(
                (el) => el.course && !el.isDeleted,
            );

            const isPreRequisiteCoursesAdded = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: { $each: updatePreRequisites },
                    },
                },
                { new: true },
            );

            if (!isPreRequisiteCoursesAdded) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    'Failed to add pre-requisite courses!',
                );
            }
        }

        const updatedCourse = await Course.findById(id).populate(
            'preRequisiteCourses.course',
        );

        await session.commitTransaction();
        session.endSession();

        return updatedCourse;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
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

const assignCourseFacultiesIntoDB = async (
    id: string,
    payload: ICourseFaculty,
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload.faculties } },
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
        },
    );

    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignCourseFacultiesIntoDB,
};
