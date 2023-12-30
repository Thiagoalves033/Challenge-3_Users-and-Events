import UseCaseError from '../ports/interfaces/UseCaseError';

export default class InvalidPasswordError extends UseCaseError {
  constructor() {
    super('Invalid Password');
  }
}
