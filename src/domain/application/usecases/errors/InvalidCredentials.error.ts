import UseCaseError from '../../../../core/errors/UseCaseError.error';

export default class InvalidCredentialsError extends UseCaseError {
  constructor() {
    super('Invalid Credentials');
  }
}
