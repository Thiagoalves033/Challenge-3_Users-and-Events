import { Request, Response, NextFunction } from 'express';
import JWTProvider from '../providers/JwtTokenProvider';
import IUserRepository from '../../core/ports/repositories/User.repository';
import UnauthorizedError from '../errors/Unauthorized.error';

type TokenPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function UserAuthMiddleware(UserRepo: IUserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('Unauthorized User');
    }

    if (token.includes('Bearer')) token = token.split(' ')[1];

    const JwtProvider = new JWTProvider(process.env.JWT_SECRET!);

    let userToken;
    try {
      userToken = JwtProvider.verify(token as string) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError('Unauthorized User');
    }

    const user = await UserRepo.findByEmail(userToken.email);
    if (!user) {
      throw new UnauthorizedError('Unauthorized User');
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
