import { EventName, events } from './client';

export function validateEventData(eventName: EventName, eventData: any) {
    return events[eventName].data.safeParse(eventData);
}
