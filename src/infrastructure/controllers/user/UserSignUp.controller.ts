import { Request, Response } from 'express';
import UserSignUp from '../../../core/usecases/user/UserSignUp.use-case';

export default class UserSignUpController {
  constructor(private usecase: UserSignUp) {}

  handle = async (req: Request, res: Response) => {
    const user = await this.usecase.execute(req.body);
    res.status(201).json(user);
  };
}
