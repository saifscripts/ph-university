import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Offered Course created successfully!',
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
        req.query,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Offered Courses fetched successfully!',
        data: result,
    });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(
        req.params.id,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Offered Course fetched successfully!',
        data: result,
    });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        req.params.id,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Offered Course updated successfully!',
        data: result,
    });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(
        req.params.id,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Offered Course deleted successfully!',
        data: result,
    });
});

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse,
};
