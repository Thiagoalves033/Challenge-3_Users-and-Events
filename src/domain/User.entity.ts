import crypto from 'crypto';

export type UserProps = {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
};

export default class User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;

  constructor(user: UserProps, id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = crypto.randomUUID();
    }
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthDate = user.birthDate;
    this.city = user.city;
    this.country = user.country;
    this.email = user.email;
    this.password = user.password;
  }
}
