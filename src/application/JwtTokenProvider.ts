import jwt from 'jsonwebtoken';
import ITokenProvider from './TokenProvider';

export default class JWTProvider implements ITokenProvider {
  constructor(private secret: string) {}

  generate(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '30d' });
  }

  verify(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
