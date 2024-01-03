import UseCaseError from '../../../../core/errors/UseCaseError.error';

export default class InvalidPasswordError extends UseCaseError {
  constructor() {
    super('Invalid Password');
  }
}
