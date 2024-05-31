import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
    const academicDepartment = await AcademicDepartment.create(payload);
    return academicDepartment;
};

const getAllAcademicDepartmentsFromDB = async () => {
    const academicDepartments = await AcademicDepartment.find();
    return academicDepartments;
};

const getSingleAcademicDepartmentFromDB = async (DepartmentId: string) => {
    const academicDepartment = await AcademicDepartment.findById(DepartmentId);

    if (!academicDepartment) {
        throw Error('Academic Department does not exist!');
    }

    return academicDepartment;
};

const updateAcademicDepartmentIntoDB = async (
    DepartmentId: string,
    payload: IAcademicDepartment,
) => {
    const updatedAcademicDepartment =
        await AcademicDepartment.findByIdAndUpdate(DepartmentId, payload, {
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
