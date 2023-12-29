import Event from '../../entities/Event.entity';

export default interface IEventRepository {
  insert(event: Event): Promise<void>;
  findAll(options: object): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  deleteMany(): Promise<void>;
  deleteById(id: string): Promise<void>;
}
