import { Schema } from 'mongoose';
import IUser from './UserInterface';

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    minlength: [5, 'Minimum length for firstName is 5']
  },

  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    minlength: [5, 'Minimum length for lastName is 5']
  },

  birthDate: { type: String, required: [true, 'birthDate is required'] },
  city: { type: String, required: [true, 'city is required'] },
  country: { type: String, required: [true, 'country is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  password: { type: String, required: [true, 'password is required'] }
});

export default UserSchema;
