export default interface IPasswordEncrypter {
  encrypt(password: string): Promise<string>;
  compare(password: string, encryptedPassword: string): Promise<boolean>;
}
