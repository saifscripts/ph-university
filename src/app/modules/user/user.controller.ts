import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
    const { password, student } = req.body;

    const studentData = await UserServices.createStudentIntoDB(
        password,
        student,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Student created successfully!',
        data: studentData,
    });
});

export const UserControllers = {
    createStudent,
};
