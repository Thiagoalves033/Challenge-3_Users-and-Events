import Event from '../../core/entities/Event.entity';
import IEventRepository from '../../core/ports/repositories/Event.repository';
import Connection from '../database/Connection';
import EventModel from '../database/event/EventModel';

type QueryObject = {
  filter?: any;
  sort?: any;
  limit?: number;
  skip?: number;
};

export default class EventInMongoRepository implements IEventRepository {
  constructor(readonly connection: Connection) {}
  async insert(event: Event): Promise<void> {
    const doc = new EventModel(event);
    await doc.save();
    event.id = doc._id.toString();
  }

  async findAll(options: QueryObject = {}): Promise<Event[]> {
    const { filter = {}, sort = {}, limit = 10, skip } = options;

    let query = EventModel.find(filter).sort(sort);

    if (limit) {
      query = query.limit(limit);
    }

    if (skip) {
      query = query.skip(skip);
    }

    const docs = await query.exec();

    return docs.map((doc) => {
      const event = new Event(doc);
      event.id = doc._id.toString();
      return event;
    });
  }

  async findById(id: string): Promise<Event | null> {
    return await EventModel.findById(id);
  }

  async deleteMany(): Promise<void> {
    await EventModel.deleteMany();
  }

  async deleteById(id: string): Promise<void> {
    await EventModel.findByIdAndDelete(id);
  }
}
