import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
    const academicDepartment = await AcademicDepartment.create(payload);
    return academicDepartment;
};

const getAllAcademicDepartmentsFromDB = async () => {
    const academicDepartments =
        await AcademicDepartment.find().populate('academicFaculty');
    return academicDepartments;
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
    const academicDepartment =
        await AcademicDepartment.findById(departmentId).populate(
            'academicFaculty',
        );

    if (!academicDepartment) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Academic Department does not exist!',
        );
    }

    return academicDepartment;
};

const updateAcademicDepartmentIntoDB = async (
    departmentId: string,
    payload: IAcademicDepartment,
) => {
    const updatedAcademicDepartment =
        await AcademicDepartment.findByIdAndUpdate(departmentId, payload, {
            new: true,
        });

    return updatedAcademicDepartment;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
};
