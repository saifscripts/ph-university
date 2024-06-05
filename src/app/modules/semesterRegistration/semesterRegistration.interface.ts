import mongoose from 'mongoose';

export interface ISemesterRegistration {
    semester: mongoose.Types.ObjectId;
    status: 'UPCOMING' | 'ONGOING' | 'ENDED';
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number;
}
