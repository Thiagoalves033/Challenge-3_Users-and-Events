import { Request, Response, NextFunction } from 'express';
import JWTProvider from '../application/JwtTokenProvider';
import IUserRepository from './User.repository';

type TokenPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function UserAuthMiddleware(UserRepo: IUserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessDenied = () => res.status(403);

    const token = req.headers.authorization?.replace('Bearer', '');

    if (!token) {
      accessDenied();
      return;
    }

    const JwtProvider = new JWTProvider(process.env.JWT_SECRET!);

    const userToken = JwtProvider.verify(token) as TokenPayload;
    const user = await UserRepo.findByEmail(userToken.email);

    if (!user) {
      accessDenied();
      return;
    }

    const loggedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    (req as any).user = loggedUser;

    next();
  };
}
