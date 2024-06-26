import UseCase from '../../../../core/usecases/UseCase';
import IEventRepository from '../../repositories/Event.repository';
import EventNotFoundError from '../errors/EventNotFound.error';

type FindOneOutput = {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
};

export default class FindOneEvent implements UseCase<string, FindOneOutput> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(eventId: string): Promise<FindOneOutput> {
    const event = await this.EventRepo.findById(eventId);

    if (!event) throw new EventNotFoundError();

    const output: FindOneOutput = {
      id: event.id,
      description: event.description,
      dayOfWeek: event.dayOfWeek,
      userId: event.userId as string
    };

    return output;
  }
}
