import User from '../../core/entities/User.entity';
import IUserRepository from '../../core/ports/repositories/User.repository';
import Connection from '../database/Connection';
import UserModel from '../database/user/UserModel';

export default class UserInMongoRepository implements IUserRepository {
  constructor(readonly connection: Connection) {}

  async insert(user: User): Promise<void> {
    const doc = new UserModel(user);
    await doc.save();
  }
  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email: email });
  }
}
