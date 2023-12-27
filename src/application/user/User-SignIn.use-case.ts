import IUserRepository from '../../infrastructure/User.repository';
import IPasswordEncrypter from '../PasswordEncrypter.port';
import ITokenProvider from '../TokenProvider';
import UseCase from '../UseCase';

type SignInInput = {
  email: string;
  password: string;
};

type SignInOutput = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export default class UserSignIn implements UseCase<SignInInput, SignInOutput> {
  constructor(
    private UserRepo: IUserRepository,
    private Encrypter: IPasswordEncrypter,
    private TokenProvider: ITokenProvider
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const existingUser = await this.UserRepo.findByEmail(input.email);
    if (!existingUser) throw new Error('Email already in use');

    const samePassword = await this.Encrypter.compare(input.password, existingUser.password);
    if (!samePassword) throw new Error('Invalid password');

    const userToken = this.TokenProvider.generate({
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email
    });

    const output: SignInOutput = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      token: userToken
    };

    return output;
  }
}
