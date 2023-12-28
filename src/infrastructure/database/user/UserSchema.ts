import { Schema } from 'mongoose';
import IUser from './UserInterface';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true, minlength: 5 },
  lastName: { type: String, required: true, minlength: 5 },
  birthDate: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default UserSchema;
