import UseCase from '../../../../core/ports/UseCase.port';
import User from '../../../enterprise/entities/User.entity';
import IUserRepository from '../../repositories/User.repository';
import IEncrypter from '../../../../core/ports/Encrypter.port';
import EmailAlreadyInUseError from '../errors/EmailAlreadyInUse.error';
import NotSavedError from '../errors/NotSaved.error';

type SignUpOutput = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
};
export default class UserSignUp implements UseCase<User, SignUpOutput> {
  constructor(
    private UserRepo: IUserRepository,
    private Encrypter: IEncrypter
  ) {}

  async execute(input: User): Promise<SignUpOutput> {
    const existingUser = await this.UserRepo.findByEmail(input.email);
    if (existingUser) throw new EmailAlreadyInUseError();

    input.password = await this.Encrypter.encrypt(input.password);

    const newUser = new User(input);
    await this.UserRepo.insert(newUser);

    const savedUser = await this.UserRepo.findByEmail(newUser.email);
    if (!savedUser) throw new NotSavedError();

    const output: SignUpOutput = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      birthDate: savedUser.birthDate,
      city: savedUser.city,
      country: savedUser.country,
      email: savedUser.email
    };

    return output;
  }
}
