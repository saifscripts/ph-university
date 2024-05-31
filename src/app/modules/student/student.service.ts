import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
    const students = await Student.find().populate('semester');

    if (!students.length) {
        throw Error('No student found!');
    }

    return students;
};

const getSingleStudentFromDB = async (studentId: string) => {
    const student = await Student.findById(studentId);

    if (!student) {
        throw Error('Student not found!');
    }

    return student;
};

const updateStudentIntoDB = async (studentId: string, payload: IStudent) => {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, payload, {
        new: true,
    });

    if (!updatedStudent) {
        throw Error('Student not found!');
    }

    return updatedStudent;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
};
