import mongoose, { Model } from 'mongoose';
import { IUserName } from '../user/user.interface';

export interface IFaculty {
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
    academicFaculty: mongoose.Types.ObjectId;
    academicDepartment: mongoose.Types.ObjectId;
    isDeleted: boolean;
}

export interface FacultyModel extends Model<IFaculty> {
    isUserExists(id: string): Promise<IFaculty | null>;
}
