import mongoose, { Model, Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';

const SemesterRegistrationSchema: Schema = new Schema<ISemesterRegistration>(
    {
        semester: {
            type: Schema.Types.ObjectId,
            ref: 'Semester',
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: SemesterRegistrationStatus,
            default: 'UPCOMING',
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        minCredit: { type: Number, default: 3 },
        maxCredit: { type: Number, default: 15 },
    },
    { timestamps: true },
);

export const SemesterRegistration: Model<ISemesterRegistration> =
    mongoose.model<ISemesterRegistration>(
        'SemesterRegistration',
        SemesterRegistrationSchema,
    );
