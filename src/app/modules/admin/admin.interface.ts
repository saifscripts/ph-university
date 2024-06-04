import mongoose, { Model } from 'mongoose';
import { IUserName } from '../user/user.interface';

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
