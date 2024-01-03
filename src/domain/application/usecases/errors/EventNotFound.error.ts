import UseCaseError from '../../../../core/errors/UseCaseError.error';

export default class EventNotFoundError extends UseCaseError {
  constructor() {
    super('Could not find event');
  }
}
