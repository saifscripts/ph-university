import config from '../../config';
import { Semester } from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateId } from './user.util';

const createStudentIntoDB = async (password: string, payload: IStudent) => {
    const admissionSemester = await Semester.findById(
        payload.admissionSemester,
    );

    if (!admissionSemester) {
        throw Error('Semester not found!');
    }

    const userData: Partial<IUser> = {
        id: await generateId(admissionSemester),
        password: password || (config.default_password as string),
        role: 'student',
    };

    const newUser = await User.create(userData);

    if (!Object.entries(newUser).length) {
        throw Error('Failed to create user');
    }

    const newStudent = await Student.create({
        ...payload,
        id: newUser.id,
        user: newUser._id,
    });

    return newStudent;
};

export const UserServices = {
    createStudentIntoDB,
};
