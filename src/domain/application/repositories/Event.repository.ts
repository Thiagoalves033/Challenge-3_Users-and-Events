import Event from '../../enterprise/entities/Event.entity';

export default interface IEventRepository {
  insert(event: Event): Promise<void>;
  findAll(options: object): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  deleteMany(options: object): Promise<Event[]>;
  deleteById(id: string): Promise<void>;
}
