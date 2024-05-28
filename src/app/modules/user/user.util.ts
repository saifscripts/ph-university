import { ISemester } from '../semester/semester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
    const lastStudent = await User.findOne({
        role: 'student',
    })
        .select('id -_id')
        .sort({ createdAt: -1 })
        .lean();

    return lastStudent?.id ? Number(lastStudent.id.substring(6)) : undefined;
};

export const generateId = async (payload: ISemester) => {
    const currentId = (await findLastStudentId()) || 0;
    const newId = (currentId + 1).toString().padStart(4, '0');

    return `${payload.year}${payload.code}${newId}`;
};
