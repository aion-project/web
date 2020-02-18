import { User } from './User';

export interface ScheduledEvent {
    eventId: string;
    scheduleId: string;
    name: string;
    startDateTime: Date;
    endDateTime: Date;
    color?: string;
    location: Location;
    users: User[];
}
