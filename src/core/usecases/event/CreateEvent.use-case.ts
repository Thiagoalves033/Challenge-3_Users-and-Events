import UseCase from '../../ports/interfaces/UseCase';
import Event from '../../entities/Event.entity';
import IEventRepository from '../../ports/repositories/Event.repository';
import NotSavedError from '../../errors/NotSaved.error';

type CreateInput = {
  description: string;
  dayOfWeek: string;
  userId: string;
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
    event.setUserId(input.userId);
    await this.EventRepo.insert(event);

    const savedEvent = await this.EventRepo.findById(event.id);
    if (!savedEvent) throw new NotSavedError();

    return {
      id: savedEvent.id,
      description: savedEvent.description,
      dayOfWeek: savedEvent.dayOfWeek,
      userId: savedEvent.userId as string
    };
  }
}
