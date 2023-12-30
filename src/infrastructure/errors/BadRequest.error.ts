import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomError';

export default class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, 'Bad Request', StatusCodes.BAD_REQUEST);
  }
}
