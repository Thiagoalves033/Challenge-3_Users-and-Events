import User from '../../../src/domain/enterprise/entities/User.entity';
import UserSignIn from '../../../src/domain/application/usecases/user/UserSignIn.use-case';

const userRepoMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn()
};

const encrypterMock = {
  encrypt: jest.fn(),
  compare: jest.fn()
};

const tokenProviderMock = {
  generate: jest.fn(),
  verify: jest.fn()
};

const userMock = {
  firstName: 'first name',
  lastName: 'last name',
  birthDate: 'birthdate',
  city: 'city',
  country: 'country',
  email: 'email',
  password: 'password'
};

const userSignIn = new UserSignIn(userRepoMock, encrypterMock, tokenProviderMock);

describe('UserSignIn usecase', () => {
  it('Should throw an error if user is not registered', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(null);

    const existingUser = async () => {
      await userSignIn.execute({ email: userMock.email, password: userMock.password });
    };

    expect(existingUser).rejects.toThrow('Invalid Credentials');
  });

  it('Should throw an error if password is invalid', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(new User(userMock));
    encrypterMock.compare.mockResolvedValueOnce(false);

    const invalidPass = async () => {
      await userSignIn.execute(new User(userMock));
    };

    expect(invalidPass).rejects.toThrow('Invalid Credentials');
  });

  it('Should generate an output with a token', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(new User(userMock));
    encrypterMock.compare.mockResolvedValueOnce(true);

    const output = await userSignIn.execute(new User(userMock));

    expect(output).toHaveProperty('token');
  });
});
