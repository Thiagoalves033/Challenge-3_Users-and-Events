import IEncrypter from '../../core/ports/Encrypter.port';
import { hash, genSalt, compare } from 'bcrypt';

export default class PasswordHasher implements IEncrypter {
  async encrypt(password: string): Promise<string> {
    const saltRounds = await genSalt(10);
    return await hash(password, saltRounds);
  }

  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return await compare(password, encryptedPassword);
  }
}
