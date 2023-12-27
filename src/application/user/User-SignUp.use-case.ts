import User from '../../domain/User.entity';
import IUserRepository from '../../infrastructure/User.repository';
import IPasswordEncrypter from '../PasswordEncrypter.port';
import UseCase from '../UseCase';

export default class UserSignUp implements UseCase<User, void> {
  constructor(
    private UserRepo: IUserRepository,
    private Encrypter: IPasswordEncrypter
  ) {}

  async execute(input: User): Promise<void> {
    const existingUser = await this.UserRepo.findByEmail(input.email);
    if (existingUser) throw new Error('Email already in use');

    input.password = await this.Encrypter.encrypt(input.password);

    const newUser = new User(input);
    await this.UserRepo.insert(newUser);
  }
}
