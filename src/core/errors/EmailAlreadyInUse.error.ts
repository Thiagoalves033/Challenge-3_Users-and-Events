import UseCaseError from '../ports/interfaces/UseCaseError';

export default class EmailAlreadyInUseError extends UseCaseError {
  constructor() {
    super('Email already in use');
  }
}
