import { Schema } from 'mongoose';
import IEvent from './EventInterface';

const EventSchema = new Schema<IEvent>({
  description: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  userId: { type: String, required: true }
});

export default EventSchema;
