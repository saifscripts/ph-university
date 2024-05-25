import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

export const UserControllers = {
    createStudent,
};
