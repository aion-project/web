import { User } from './User';
import { Location } from './Location';

export interface Reservation {
    id: string;
    event: string;
    description?: string;
    startDateTime: Date;
    endDateTime: Date;
    location: Location;
    requestedBy: User;
}
