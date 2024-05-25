import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterServices } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
    const newSemester = await SemesterServices.createSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester created successfully!',
        data: newSemester,
    });
});

export const SemesterControllers = {
    createSemester,
};
