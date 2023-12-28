import UseCase from '../../ports/interfaces/UseCase';
import IEventRepository from '../../ports/repositories/Event.repository';

export default class DeleteManyEvents implements UseCase<void, void> {
  constructor(private EventRepo: IEventRepository) {}

  async execute(): Promise<void> {
    await this.EventRepo.deleteMany();
    // const output: DeleteManyOutput[] = [];

    // for (const event of events) {
    //   output.push({
    //     id: event.id,
    //     description: event.description,
    //     dayOfWeek: event.dayOfWeek,
    //     userId: event.userId as string
    //   });
    // }

    // return output;
  }
}
