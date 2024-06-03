// will be used in student, faculty and admin module
export interface IUserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface IUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: 'in-progress' | 'block';
    role: 'student' | 'faculty' | 'admin';
    isDeleted: boolean;
}
