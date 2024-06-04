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

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty } = req.body;

    const facultyData = await UserServices.createFacultyIntoDB(
        password,
        faculty,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty created successfully!',
        data: facultyData,
    });
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin } = req.body;

    const adminData = await UserServices.createAdminIntoDB(password, admin);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Admin created successfully!',
        data: adminData,
    });
});

export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
};
