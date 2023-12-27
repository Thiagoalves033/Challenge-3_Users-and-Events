import User, { UserProps } from '../src/domain/User.entity';

describe('User entity', () => {
  it('Should have the correct properties for a user', () => {
    const userInput: UserProps = {
      firstName: 'first name',
      lastName: 'last name',
      birthDate: 'birthdate',
      city: 'city',
      country: 'country',
      email: 'email',
      password: 'password'
    };

    const user = new User(userInput);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName', 'first name');
    expect(user).toHaveProperty('lastName', 'last name');
    expect(user).toHaveProperty('birthDate', 'birthdate');
    expect(user).toHaveProperty('city', 'city');
    expect(user).toHaveProperty('country', 'country');
    expect(user).toHaveProperty('email', 'email');
    expect(user).toHaveProperty('password', 'password');
  });

  it('Should have specified id', () => {
    const userInput: UserProps = {
      firstName: 'first name',
      lastName: 'last name',
      birthDate: 'birthdate',
      city: 'city',
      country: 'country',
      email: 'email',
      password: 'password'
    };

    const user = new User(userInput, 'id');

    expect(user.id).toBe('id');
  });
});
