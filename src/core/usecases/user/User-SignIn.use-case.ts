import IPasswordEncrypter from '../../ports/interfaces/PasswordEncrypter.port';
import ITokenProvider from '../../ports/interfaces/TokenProvider';
import UseCase from '../../ports/interfaces/UseCase';
import IUserRepository from '../../ports/repositories/User.repository';

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
