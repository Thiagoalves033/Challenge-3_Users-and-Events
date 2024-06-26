import CreateEvent from '../../../../domain/application/usecases/event/CreateEvent.use-case';
import IUserRepository from '../../../../domain/application/repositories/User.repository';
import UnauthorizedError from '../../../errors/Unauthorized.error';
import { Request, Response } from 'express';

export default class CreateEventController {
  constructor(
    private usecase: CreateEvent,
    private userRepo: IUserRepository
  ) {}

  handle = async (req: Request, res: Response) => {
    const user = await this.userRepo.findByEmail((req as any).user.email);
    if (!user) throw new UnauthorizedError('Invalid user');

    const CreateInput = {
      ...req.body,
      userId: user.id
    };

    const event = await this.usecase.execute(CreateInput);
    res.status(201).json(event);
  };
}
