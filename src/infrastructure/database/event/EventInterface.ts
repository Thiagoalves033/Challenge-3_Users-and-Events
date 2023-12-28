import { UUID } from 'crypto';
import { Document, ObjectId } from 'mongoose';

export default interface IEvent extends Document {
  description: string;
  dayOfWeek: string;
  userId: UUID | ObjectId;
}
