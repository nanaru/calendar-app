import { AgendaEntry } from './AgendaEntry';

export type AgendaSchedule = {
  [date: string]: AgendaEntry[];
};
