import User from '../../entities/User.entity';
import IUserRepository from '../../ports/repositories/User.repository';
import IPasswordEncrypter from '../../ports/interfaces/PasswordEncrypter.port';
import UseCase from '../../ports/interfaces/UseCase';
import EmailAlreadyInUseError from '../../errors/EmailAlreadyInUse.error';

export default class UserSignUp implements UseCase<User, void> {
  constructor(
    private UserRepo: IUserRepository,
    private Encrypter: IPasswordEncrypter
  ) {}

  async execute(input: User): Promise<void> {
    const existingUser = await this.UserRepo.findByEmail(input.email);
    if (existingUser) throw new EmailAlreadyInUseError();

    input.password = await this.Encrypter.encrypt(input.password);

    const newUser = new User(input);
    await this.UserRepo.insert(newUser);
  }
}
