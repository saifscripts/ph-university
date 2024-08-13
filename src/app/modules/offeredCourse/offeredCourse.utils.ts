import { ISchedule } from './offeredCourse.interface';

const hasTimeConflict = (
    assignedSchedules: ISchedule[],
    newSchedule: ISchedule,
) => {
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);

        // check if the time conflicts between existing time and new time
        if (newEndTime > existingStartTime && existingEndTime > newStartTime) {
            return true;
        }
    }

    return false;
};

export default hasTimeConflict;
