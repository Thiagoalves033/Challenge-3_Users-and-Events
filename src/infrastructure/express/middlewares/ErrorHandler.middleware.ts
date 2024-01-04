import EventNotFoundError from '../../../domain/application/usecases/errors/EventNotFound.error';
import EmailAlreadyInUseError from '../../../domain/application/usecases/errors/EmailAlreadyInUse.error';
import NotSavedError from '../../../domain/application/usecases/errors/NotSaved.error';
import InvalidPasswordError from '../../../domain/application/usecases/errors/InvalidPassword.error';

import ValidationError from '../../errors/Validation.error';
import CustomAPIError from '../../errors/CustomError';

import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export default function ErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof EventNotFoundError) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ statusCode: StatusCodes.NOT_FOUND, msg: err.message, error: 'Not Found' });
  }

  if (err instanceof EmailAlreadyInUseError) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ statusCode: StatusCodes.CONFLICT, msg: err.message, error: 'Conflict' });
  }

  if (err instanceof NotSavedError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message,
      error: 'Internal Server Error'
    });
  }

  if (err instanceof InvalidPasswordError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ statusCode: StatusCodes.UNAUTHORIZED, msg: err.message, error: 'Unauthorized' });
  }

  if (err instanceof mongoose.Error.CastError) {
    const value = err.stringValue;
    const field = err.path;

    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `Invalid value '${value}' provided for field '${field}'`,
      error: 'Cast Error'
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((error) => {
      return {
        resource: error.path,
        message: error.message
      };
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      type: 'Validation Error',
      errors: errors
    });
  }

  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      type: err.type,
      errors: err.errors
    });
  }

  if (err instanceof CustomAPIError) {
    return res.status(500).json({
      statusCode: err.statusCode,
      msg: err.message,
      error: err.type
    });
  }

  return res.status(500).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong',
    error: 'Internal Server Error'
  });
}
