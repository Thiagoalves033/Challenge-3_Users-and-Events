import UseCase from '../../ports/interfaces/UseCase';
import Event from '../../entities/Event.entity';
import IEventRepository from '../../ports/repositories/Event.repository';

type CreateInput = {
  description: string;
  dayOfWeek: string;
};

type CreateOutput = {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
};

export default class CreateEvent implements UseCase<CreateInput, CreateOutput> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(input: CreateInput): Promise<CreateOutput> {
    const event = new Event(input);
    event.setUserId('1');
    await this.EventRepo.insert(event);

    const savedEvent = await this.EventRepo.findById(event.id);
    if (!savedEvent) throw new Error('Could not save event');

    return {
      id: savedEvent.id,
      description: savedEvent.description,
      dayOfWeek: savedEvent.dayOfWeek,
      userId: savedEvent.userId as string
    };
  }
}
