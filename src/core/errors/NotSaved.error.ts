import UseCaseError from '../ports/interfaces/UseCaseError';

export default class NotSavedError extends UseCaseError {
  constructor() {
    super('Could not save');
  }
}
