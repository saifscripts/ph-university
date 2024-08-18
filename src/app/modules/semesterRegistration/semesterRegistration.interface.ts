import mongoose from 'mongoose';
import { RegistrationStatus } from './semesterRegistration.constant';

export interface ISemesterRegistration {
    semester: mongoose.Types.ObjectId;
    status: keyof typeof RegistrationStatus;
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number;
}
