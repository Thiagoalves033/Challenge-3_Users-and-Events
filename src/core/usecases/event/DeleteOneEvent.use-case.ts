import EventNotFoundError from '../../errors/EventNotFound.error';
import UseCase from '../../ports/interfaces/UseCase';
import IEventRepository from '../../ports/repositories/Event.repository';

export default class DeleteOneEvent implements UseCase<string, void> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(eventId: string): Promise<void> {
    const event = await this.EventRepo.findById(eventId);

    if (!event) throw new EventNotFoundError();

    await this.EventRepo.deleteById(event.id);
  }
}
