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

const getAllSemesters = catchAsync(async (_req, res) => {
    const semesters = await SemesterServices.getAllSemestersFromDB();

    if (!semesters.length) {
        throw Error('No semester found!');
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semesters fetched successfully!',
        data: semesters,
    });
});

const getSingleSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const semester = await SemesterServices.getSingleSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester fetched successfully!',
        data: semester,
    });
});

const updateSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const semesterData = req.body;

    const updatedSemester = await SemesterServices.updateSemesterIntoDB(
        semesterId,
        semesterData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Semester updated successfully!',
        data: updatedSemester,
    });
});

export const SemesterControllers = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
};
