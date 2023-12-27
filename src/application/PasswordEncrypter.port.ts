export default interface IPasswordEncrypter {
  encrypt(password: string): Promise<string>;
}
