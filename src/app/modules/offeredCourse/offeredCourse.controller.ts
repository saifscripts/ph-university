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

export const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
};
