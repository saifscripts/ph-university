import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: IStudent) => {
    const userData: Partial<IUser> = {
        id: '2030100001',
        password: password || (config.default_password as string),
        role: 'student',
    };

    const newUser = await User.create(userData);

    if (!Object.entries(newUser).length) {
        throw Error('Failed to create user');
    }

    const newStudent = await Student.create({
        ...studentData,
        id: newUser.id,
        user: newUser._id,
    });

    return newStudent;
};

export const UserServices = {
    createStudentIntoDB,
};
