import UseCase from '../../ports/interfaces/UseCase';
import IEventRepository from '../../ports/repositories/Event.repository';

export default class DeleteOneEvent implements UseCase<string, void> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(eventId: string): Promise<void> {
    const event = await this.EventRepo.findById(eventId);

    if (!event) throw new Error('Could not find event');

    await this.EventRepo.deleteById(event.id);
  }
}
