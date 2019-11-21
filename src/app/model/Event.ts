import { User } from './User';

export interface Event {
    id: String,
    name: String,
    description?: String,
    startDateTime: Date,
    endDateTime?: Date,
    repeat: String,
    createdBy: User,
}