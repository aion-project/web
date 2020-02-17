import { User } from './User';
import { Group } from './Group';
import { Subject } from './Subject';
import { Reschedule } from './Reschedule';
import { Schedule } from './Schedule';

export interface Event {
    id: string;
    name: string;
    description?: string;
    createdBy: User;
    groups: Group[];
    subject?: Subject;
    schedules?: Schedule[];
    reschedules?: Reschedule[];
}

export interface EventDisp {
    id: string;
    name: string;
    description?: string;
    groups: string;
    subject: string;
    subjectColor: string;
}
