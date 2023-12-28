import crypto from 'crypto';

export type EventProps = {
  description: string;
  dayOfWeek: string;
};

export default class Event {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string | undefined;

  constructor(event: EventProps, id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = crypto.randomUUID();
    }
    this.description = event.description;
    this.dayOfWeek = event.dayOfWeek;
    this.userId = undefined;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
}
