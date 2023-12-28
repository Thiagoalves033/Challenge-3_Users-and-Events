import { model } from 'mongoose';
import IEvent from './EventInterface';
import EventSchema from './EventSchema';

export default model<IEvent>('Event', EventSchema);
