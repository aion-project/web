import { User } from './User';
import { Group } from './Group';
import { Subject } from './Subject';
import { Reschedule } from './Reschedule';
import { Schedule } from './Schedule';

export interface Event {
    id: String,
    name: String,
    description?: String,
    createdBy: User,
    groups: Group[],
    subject?: Subject,
    schedules?: Schedule[],
    reschedules?: Reschedule[]
}