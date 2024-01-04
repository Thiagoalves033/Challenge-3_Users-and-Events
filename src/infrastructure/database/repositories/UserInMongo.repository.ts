import User from '../../../domain/enterprise/entities/User.entity';
import IUserRepository from '../../../domain/application/repositories/User.repository';
import UserModel from '../user/UserModel';
import Connection from '../Connection';

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
