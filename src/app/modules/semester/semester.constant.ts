import { ISemesterNameCodeMapper } from './semester.interface';

export const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export const SemesterName = ['Autumn', 'Summer', 'Fall'] as const;
export const SemesterCode = ['01', '02', '03'] as const;

export const SemesterNameCodeMapper: ISemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};

export const SemesterSearchableFields = ['name'];