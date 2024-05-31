import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
    const students = await Student.find()
        .populate('semester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    if (!students.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No student found!');
    }

    return students;
};

const getSingleStudentFromDB = async (studentId: string) => {
    const student = await Student.findById(studentId)
        .populate('semester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
    }

    return student;
};

const updateStudentIntoDB = async (studentId: string, payload: IStudent) => {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, payload, {
        new: true,
    });

    if (!updatedStudent) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
    }

    return updatedStudent;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
};
