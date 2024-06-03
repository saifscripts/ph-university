import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
    const faculties = await FacultyServices.getAllFacultiesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Faculties fetched successfully!',
        data: faculties,
    });
});

const getSingleFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const faculty = await FacultyServices.getSingleFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty fetched successfully!',
        data: faculty,
    });
});

const updateFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const updatedFaculty = await FacultyServices.updateFacultyIntoDB(
        facultyId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty updated successfully!',
        data: updatedFaculty,
    });
});

const deleteFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const deletedFaculty = await FacultyServices.deleteFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty deleted successfully!',
        data: deletedFaculty,
    });
});

export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
