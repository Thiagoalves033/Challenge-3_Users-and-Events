import User from '../domain/User.entity';

export default interface IUserRepository {
  insert(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
