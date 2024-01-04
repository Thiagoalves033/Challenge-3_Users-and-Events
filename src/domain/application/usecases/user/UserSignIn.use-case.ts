import UseCase from '../../../../core/ports/UseCase.port';
import IUserRepository from '../../repositories/User.repository';
import IEncrypter from '../../../../core/ports/Encrypter.port';
import ITokenProvider from '../../../../core/ports/TokenProvider.port';
import InvalidCredentialsError from '../errors/InvalidCredentials.error';

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
    private Encrypter: IEncrypter,
    private TokenProvider: ITokenProvider
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const existingUser = await this.UserRepo.findByEmail(input.email);
    if (!existingUser) throw new InvalidCredentialsError();

    const samePassword = await this.Encrypter.compare(input.password, existingUser.password);
    if (!samePassword) throw new InvalidCredentialsError();

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
