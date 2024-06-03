import { Faculty } from '../faculty/faculty.model';
import { ISemester } from '../semester/semester.interface';
import { Student } from '../student/student.model';

const findLastStudentId = async (year: string, code: string) => {
    const regex = RegExp(`^${year}${code}`);

    const lastStudent = await Student.findOne(
        { id: regex },
        { id: 1 },
        { getDeletedStudents: true },
    ).sort({
        id: -1,
    });

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

const findLastFacultyId = async () => {
    const lastFaculty = await Faculty.findOne(
        {},
        { id: 1 },
        { getDeletedFaculties: true },
    ).sort({
        id: -1,
    });

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateStudentId = async (payload: ISemester) => {
    const { year, code } = payload;

    const lastStudentId = await findLastStudentId(year, code);
    const currentId: number = Number(lastStudentId) || 0;
    const incrementedId: string = (currentId + 1).toString().padStart(4, '0');

    return `${year}${code}${incrementedId}`;
};

export const generateFacultyId = async () => {
    const lastFacultyId = await findLastFacultyId();
    const currentId: number = Number(lastFacultyId) || 0;
    const incrementedId: string = (currentId + 1).toString().padStart(4, '0');

    return `F-${incrementedId}`;
};
