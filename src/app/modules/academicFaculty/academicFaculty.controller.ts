import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const newAcademicFaculty =
        await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Faculty created successfully!',
        data: newAcademicFaculty,
    });
});

const getAllAcademicFaculties = catchAsync(async (_req, res) => {
    const academicFaculties =
        await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Faculties fetched successfully!',
        data: academicFaculties,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const academicFaculty =
        await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Faculty fetched successfully!',
        data: academicFaculty,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;

    const updatedAcademicFaculty =
        await AcademicFacultyServices.updateAcademicFacultyIntoDB(
            facultyId,
            req.body,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Faculty updated successfully!',
        data: updatedAcademicFaculty,
    });
});

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
};
