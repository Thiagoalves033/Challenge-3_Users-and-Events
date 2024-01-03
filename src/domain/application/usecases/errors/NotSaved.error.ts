import UseCaseError from '../../../../core/errors/UseCaseError.error';

export default class NotSavedError extends UseCaseError {
  constructor() {
    super('Could not save');
  }
}
