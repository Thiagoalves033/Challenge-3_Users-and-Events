import IPasswordEncrypter from './PasswordEncrypter.port';
import { hash, genSalt } from 'bcrypt';

export default class PasswordHasher implements IPasswordEncrypter {
  async encrypt(password: string): Promise<string> {
    const saltRounds = await genSalt(10);
    return await hash(password, saltRounds);
  }
}
