import UseCase from '../../ports/interfaces/UseCase';
import IEventRepository from '../../ports/repositories/Event.repository';

type findAllOutput = {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
};

type QueryObject = {
  filter?: any;
  sort?: any;
  limit?: number;
  offset?: number;
};

export default class FindAllEvents implements UseCase<QueryObject, findAllOutput[]> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(options: QueryObject): Promise<findAllOutput[]> {
    const events = await this.EventRepo.findAll(options);
    const output: findAllOutput[] = [];

    for (const event of events) {
      output.push({
        id: event.id,
        description: event.description,
        dayOfWeek: event.dayOfWeek,
        userId: event.userId as string
      });
    }

    return output;
  }
}
