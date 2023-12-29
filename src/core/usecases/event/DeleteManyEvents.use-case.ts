import UseCase from '../../ports/interfaces/UseCase';
import IEventRepository from '../../ports/repositories/Event.repository';

type DeleteManyOutput = {
  id: string;
  description: string;
  dayOfWeek: string;
  userId: string;
};
export default class DeleteManyEvents implements UseCase<object, DeleteManyOutput[]> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(options: object): Promise<DeleteManyOutput[]> {
    const events = await this.EventRepo.deleteMany(options);

    const output: DeleteManyOutput[] = [];

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
