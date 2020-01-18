import { User } from './User';
import { Role } from './Role';
import { Group } from './Group';
import { Subject } from './Subject';
import { Reschedule } from './Reschedule';

export const EventType = {
    NONE: "NONE",
    DAILY: "DAILY",
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
}

export interface Event {
    id: String,
    name: String,
    description?: String,
    createdBy: User,
    groups: Group[],
    subject?: Subject,
    reschedules?: Reschedule[]
}