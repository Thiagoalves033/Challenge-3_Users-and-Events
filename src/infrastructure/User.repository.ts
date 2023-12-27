import User from '../domain/User.entity';

export default interface IUserRepository {
  insert(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
