import Event from '../../entities/Event.entity';

type QueryObject = {
  filter?: any;
  sort?: any;
  limit?: number;
  offset?: number;
};
export default interface IEventRepository {
  insert(event: Event): Promise<void>;
  findAll(options: QueryObject): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  deleteMany(): Promise<void>;
  deleteById(id: string): Promise<void>;
}
