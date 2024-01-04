import UserSignIn from '../../../../domain/application/usecases/user/UserSignIn.use-case';
import { Request, Response } from 'express';

export default class UserSignInController {
  constructor(private usecase: UserSignIn) {}

  handle = async (req: Request, res: Response) => {
    const user = await this.usecase.execute(req.body);
    res.status(200).json(user);
  };
}
