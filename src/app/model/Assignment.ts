import { User } from './User';
import { Role } from './Role';

export interface Assignment {
    user: User,
    event: Event,
    role: String
}