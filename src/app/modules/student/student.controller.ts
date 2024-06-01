import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (_req, res) => {
    const students = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Students fetched successfully!',
        data: students,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const student = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Student fetched successfully!',
        data: student,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;

    const updatedStudent = await StudentServices.updateStudentIntoDB(
        studentId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Student updated successfully!',
        data: updatedStudent,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;

    const deletedStudent = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Student deleted successfully!',
        data: deletedStudent,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
