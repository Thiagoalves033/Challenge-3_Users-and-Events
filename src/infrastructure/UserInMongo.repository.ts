import User from '../domain/User.entity';
import IUserRepository from './User.repository';
import Connection from './database/Connection';
import UserModel from './database/UserModel';

export default class UserInMongoRepository implements IUserRepository {
  constructor(readonly connection: Connection) {}

  async insert(user: User): Promise<void> {
    const doc = new UserModel(user);
    await doc.save();
  }
  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}
