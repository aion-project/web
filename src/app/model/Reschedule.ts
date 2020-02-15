export interface Reschedule {
    id: string;
    event: Event;
    oldDateTime: Date;
    newDateTime?: Date;
    status: string;
    type: string;
}
