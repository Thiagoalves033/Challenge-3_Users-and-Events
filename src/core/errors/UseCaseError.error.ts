export default class UseCaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
