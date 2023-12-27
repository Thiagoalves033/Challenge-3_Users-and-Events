import { model } from 'mongoose';
import IUser from './UserInterface';
import UserSchema from './UserSchema';

export default model<IUser>('User', UserSchema);
