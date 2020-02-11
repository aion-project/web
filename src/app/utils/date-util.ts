import { Event } from '../model/Event';
import * as moment from 'moment';

export function getEventAt(events: Event[], time: string): Event[] {
    return events.filter(event => {
        return true;
        // if (event.repeat === EventType.NONE) {
        //     return moment(time).isBetween(event.startDateTime, event.endDateTime, null, "[]")
        // } else if (event.repeat === EventType.DAILY) {
        //     if (!moment(time).isSameOrAfter(event.startDateTime))
        //         return false;

        //     let currentTime = moment(time).format("YYYY-MM-DD");
        //     let eventStartTime = currentTime + " " + moment(event.startDateTime).format("hh:mm:ss")
        //     let eventEndTime = currentTime + " " + moment(event.endDateTime).format("hh:mm:ss")
        //     return moment(time).isBetween(eventStartTime, eventEndTime, null, "[]")
        // } else if (event.repeat === EventType.WEEKLY) {
        //     if (moment(event.startDateTime).format("e") != moment(time).format("e") || !moment(time).isSameOrAfter(event.startDateTime))
        //         return false;

        //     let currentTime = moment(time).format("YYYY-MM-DD");
        //     let eventStartTime = currentTime + " " + moment(event.startDateTime).format("HH:mm:ss")
        //     let eventEndTime = currentTime + " " + moment(event.endDateTime).format("HH:mm:ss")
        //     return moment(time).isBetween(eventStartTime, eventEndTime, null, "[]")
        // } else return false;
    });
}
