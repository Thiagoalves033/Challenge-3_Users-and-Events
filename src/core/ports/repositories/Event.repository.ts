import Event from '../../entities/Event.entity';

export default interface IEventRepository {
  insert(event: Event): Promise<void>;
  findById(id: string): Promise<Event | null>;
}
