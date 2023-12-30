import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomError';

export default class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, 'Unauthorized', StatusCodes.UNAUTHORIZED);
  }
}
