import User from '../../../src/core/entities/User.entity';
import UserSignUp from '../../../src/core/usecases/user/UserSignUp.use-case';

const userRepoMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn()
};

const encrypterMock = {
  encrypt: jest.fn(),
  compare: jest.fn()
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

const userSignUp = new UserSignUp(userRepoMock, encrypterMock);

describe('UserSignUp usecase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should encrypt password and insert a new user', async () => {
    const user = new User(userMock);

    userRepoMock.findByEmail.mockResolvedValueOnce(null);
    userRepoMock.findByEmail.mockResolvedValueOnce(user);
    encrypterMock.encrypt.mockResolvedValueOnce('encryptedPass');

    await userSignUp.execute(user);

    expect(encrypterMock.encrypt).toHaveBeenCalledWith('password');
    expect(userRepoMock.insert).toHaveBeenCalledWith(expect.any(User));
    expect(userRepoMock.insert).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'encryptedPass' })
    );
    expect(userRepoMock.findByEmail).toHaveBeenCalledTimes(2);
  });

  it('Should return an object without password', async () => {
    const user = new User(userMock);

    userRepoMock.findByEmail.mockResolvedValueOnce(null);
    userRepoMock.findByEmail.mockResolvedValueOnce(user);
    encrypterMock.encrypt.mockResolvedValueOnce('encryptedPass');

    const output = await userSignUp.execute(user);

    expect(output).not.toHaveProperty('password');
  });

  it('Should throw an error if existing email is found', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(new User(userMock));

    const existingUser = async () => {
      await userSignUp.execute(new User(userMock));
    };

    expect(existingUser).rejects.toThrow('Email already in use');
  });

  it('Should throw an error if user not saved correctly', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(null);
    encrypterMock.encrypt.mockResolvedValueOnce('encryptedPass');

    const existingUser = async () => {
      await userSignUp.execute(new User(userMock));
    };

    await expect(existingUser).rejects.toThrow('Could not save');
    expect(userRepoMock.findByEmail).toHaveBeenCalledTimes(2);
  });
});
