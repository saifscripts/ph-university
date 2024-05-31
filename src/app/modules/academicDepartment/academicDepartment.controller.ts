import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const newAcademicDepartment =
        await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
            req.body,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Department created successfully!',
        data: newAcademicDepartment,
    });
});

const getAllAcademicDepartments = catchAsync(async (_req, res) => {
    const academicDepartments =
        await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Departments fetched successfully!',
        data: academicDepartments,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;

    const academicDepartment =
        await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
            departmentId,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Department fetched successfully!',
        data: academicDepartment,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;

    const updatedAcademicDepartment =
        await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
            departmentId,
            req.body,
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Academic Department updated successfully!',
        data: updatedAcademicDepartment,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
