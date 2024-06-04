export interface IUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: 'in-progress' | 'block';
    role: 'student' | 'faculty' | 'admin';
    isDeleted: boolean;
}
