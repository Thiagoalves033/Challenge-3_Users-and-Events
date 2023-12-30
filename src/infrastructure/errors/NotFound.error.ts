import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomError';

export default class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
