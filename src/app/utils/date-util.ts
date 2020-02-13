import { Event } from '../model/Event';
import * as moment from 'moment';
import { ScheduledEvent } from '../model/ScheduledEvent';

export function getEventAt(events: ScheduledEvent[], time: string): ScheduledEvent[] {
    return events.filter(event => {
        return moment(time).isBetween(moment(event.startDateTime), moment(event.endDateTime));
    });
}
