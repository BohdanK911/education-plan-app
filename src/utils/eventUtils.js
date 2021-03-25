import { v4 as uuid } from 'uuid';

let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export const createEventId = () => uuid();

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
];
