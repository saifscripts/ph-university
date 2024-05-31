import mongoose, { Types } from 'mongoose';

export interface IUserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface IGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export interface ILocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export interface IStudent {
    id: string;
    user: mongoose.Types.ObjectId;
    name: IUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    profileImage: string;
    semester: Types.ObjectId;
    isDeleted: boolean;
}
