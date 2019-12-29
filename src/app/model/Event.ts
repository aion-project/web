import { User } from './User';
import { Role } from './Role';
import { Group } from './Group';
import { Subject } from './Subject';

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
    startDateTime: Date,
    endDateTime?: Date,
    repeat: String,
    createdBy: User,
    groups: Group[],
    subject?: Subject
}