import UseCaseError from '../../../../core/errors/UseCaseError.error';

export default class EmailAlreadyInUseError extends UseCaseError {
  constructor() {
    super('Email already in use');
  }
}
