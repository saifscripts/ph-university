import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
    const newCourse = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course created successfully!',
        data: newCourse,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const courses = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Courses fetched successfully!',
        data: courses,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course fetched successfully!',
        data: course,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const updatedCourse = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course updated successfully!',
        data: updatedCourse,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const deletedCourse = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course deleted successfully!',
        data: deletedCourse,
    });
});

const assignCourseFaculties = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await CourseServices.assignCourseFacultiesIntoDB(
        id,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course faculties assigned successfully!',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignCourseFaculties,
};
