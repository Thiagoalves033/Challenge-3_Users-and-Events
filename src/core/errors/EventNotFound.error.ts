import UseCaseError from '../ports/interfaces/UseCaseError';

export default class EventNotFoundError extends UseCaseError {
  constructor() {
    super('Could not find event');
  }
}
