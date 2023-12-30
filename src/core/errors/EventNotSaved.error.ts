import UseCaseError from '../ports/interfaces/UseCaseError';

export default class EventNotSavedError extends UseCaseError {
  constructor() {
    super('Could not save event');
  }
}
