export type UserProps = {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default class User {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(user: UserProps) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthDate = user.birthDate;
    this.city = user.city;
    this.country = user.country;
    this.email = user.email;
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
  }
}
