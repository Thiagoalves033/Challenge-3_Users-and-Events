export default interface ITokenProvider {
  generate(payload: object): string;
  verify(token: string): string | object;
}
