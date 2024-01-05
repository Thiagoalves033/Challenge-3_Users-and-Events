import Event from '../../../domain/enterprise/entities/Event.entity';
import IEventRepository from '../../../domain/application/repositories/Event.repository';
import EventModel from '../event/EventModel';
import Connection from '../Connection';

type QueryObject = {
  day?: string;
  description?: string;
  sort?: string;
  limit?: number;
  page?: number;
};

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

type FilterList = {
  dayOfWeek?: { $regex: string; $options: 'i' };
  description?: { $regex: string; $options: 'i' };
};
export default class EventInMongoRepository implements IEventRepository {
  constructor(readonly connection: Connection) {}
  async insert(event: Event): Promise<void> {
    const doc = new EventModel(event);
    await doc.save();
    event.id = doc._id.toString();
  }

  async findAll(options: QueryObject = {}): Promise<Event[]> {
    const { day, description, sort, limit = 7, page = 1 } = options;

    const filter: FilterList = {};
    if (day) filter.dayOfWeek = { $regex: day as string, $options: 'i' };
    if (description) filter.description = { $regex: description as string, $options: 'i' };

    let query = EventModel.find(filter).sort(sort);

    if (limit) {
      query = query.limit(limit);
    }

    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    let docs = await query.exec();

    if (sort && sort === 'dayOfWeek') {
      docs = docs.sort((a, b) => {
        return (
          daysOfWeek.indexOf(a.dayOfWeek.toLowerCase()) -
          daysOfWeek.indexOf(b.dayOfWeek.toLowerCase())
        );
      });
    }

    if (sort && sort === '-dayOfWeek') {
      docs = docs.sort((a, b) => {
        return (
          daysOfWeek.indexOf(b.dayOfWeek.toLowerCase()) -
          daysOfWeek.indexOf(a.dayOfWeek.toLowerCase())
        );
      });
    }

    return docs.map((doc) => {
      const event = new Event(doc);
      event.id = doc._id.toString();
      event.userId = doc.userId.toString();
      return event;
    });
  }

  async findById(id: string): Promise<Event | null> {
    return await EventModel.findById(id);
  }

  async deleteMany(options: QueryObject): Promise<Event[]> {
    const { day } = options;

    const filter: FilterList = {};
    if (day) filter.dayOfWeek = { $regex: day as string, $options: 'i' };

    const docs = await EventModel.find(filter).lean();

    await EventModel.deleteMany(filter);

    return docs.map((doc) => {
      const event = new Event(doc);
      event.id = doc._id.toString();
      event.userId = doc.userId.toString();
      return event;
    });
  }

  async deleteById(id: string): Promise<void> {
    await EventModel.findByIdAndDelete(id);
  }
}
