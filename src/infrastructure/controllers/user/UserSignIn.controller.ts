import { Request, Response } from 'express';
import UserSignIn from '../../../core/usecases/user/UserSignIn.use-case';

export default class UserSignInController {
  constructor(private usecase: UserSignIn) {}

  handle = async (req: Request, res: Response) => {
    const user = await this.usecase.execute(req.body);
    res.status(200).json(user);
  };
}
