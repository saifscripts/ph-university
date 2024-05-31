import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
    const academicFaculty = await AcademicFaculty.create(payload);
    return academicFaculty;
};

const getAllAcademicFacultiesFromDB = async () => {
    const academicFaculties = await AcademicFaculty.find();
    return academicFaculties;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
    const academicFaculty = await AcademicFaculty.findById(facultyId);

    if (!academicFaculty) {
        throw Error('Academic Faculty does not exist!');
    }

    return academicFaculty;
};

const updateAcademicFacultyIntoDB = async (
    facultyId: string,
    payload: IAcademicFaculty,
) => {
    const updatedAcademicFaculty = await AcademicFaculty.findByIdAndUpdate(
        facultyId,
        payload,
        { new: true },
    );

    return updatedAcademicFaculty;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
};
