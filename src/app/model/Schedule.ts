import { User } from './User';

export const ScheduleType = {
    NONE: 'NONE',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY'
};

export interface Schedule {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    repeat: string;
    event?: Event;
    users?: User[];
}
