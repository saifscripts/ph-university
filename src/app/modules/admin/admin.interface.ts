import mongoose, { Model } from 'mongoose';

export interface IUserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface IAdmin {
    id: string;
    user: mongoose.Types.ObjectId;
    name: IUserName;
    designation: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    managementDepartment: string;
    isDeleted: boolean;
}

export interface AdminModel extends Model<IAdmin> {
    isUserExists(id: string): Promise<IAdmin | null>;
}
