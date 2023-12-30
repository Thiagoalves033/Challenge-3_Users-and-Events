import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomError';
import { ValidationResult } from 'joi';

export default class ValidationError extends CustomAPIError {
  errors: Array<{ resource: string; message: string }>;

  constructor(error: ValidationResult) {
    super(error.error?.message!, 'Validation Error', StatusCodes.BAD_REQUEST);

    this.errors =
      error.error?.details.map((detail) => ({
        resource: detail.path[0] as string,
        message: detail.message
      })) || [];
  }
}
