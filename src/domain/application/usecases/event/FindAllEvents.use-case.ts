import UseCase from '../../../../core/usecases/UseCase';
import IEventRepository from '../../repositories/Event.repository';

type FindAllOutput = {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
};
export default class FindAllEvents implements UseCase<object, FindAllOutput[]> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(options: object): Promise<FindAllOutput[]> {
    const events = await this.EventRepo.findAll(options);
    const output: FindAllOutput[] = [];

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
