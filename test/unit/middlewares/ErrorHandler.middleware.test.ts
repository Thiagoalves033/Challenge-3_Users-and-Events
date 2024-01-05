import ErrorHandler from '../../../src/infrastructure/express/middlewares/ErrorHandler.middleware';

import EmailAlreadyInUseError from '../../../src/domain/application/usecases/errors/EmailAlreadyInUse.error';
import EventNotFoundError from '../../../src/domain/application/usecases/errors/EventNotFound.error';
import InvalidCredentialsError from '../../../src/domain/application/usecases/errors/InvalidCredentials.error';
import NotSavedError from '../../../src/domain/application/usecases/errors/NotSaved.error';

import BadRequestError from '../../../src/infrastructure/errors/BadRequest.error';

import mongoose from 'mongoose';

import ValidationError from '../../../src/infrastructure/errors/Validation.error';
import { ValidationResult } from 'joi';

import { Request, Response } from 'express';

const reqMock = {} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

describe('ErrorHandler middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should result in Not Found Error', async () => {
    const error = new EventNotFoundError();

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(404);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Could not find event' })
    );
  });

  it('Should result in Conflict Error', async () => {
    const error = new EmailAlreadyInUseError();

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(409);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Email already in use' })
    );
  });

  it('Should result in Internal Server Error', async () => {
    const error = new NotSavedError();

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({ msg: 'Could not save' }));
  });

  it('Should result in Unauthorized Error', async () => {
    const error = new InvalidCredentialsError();

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Invalid Credentials' })
    );
  });

  it('Should result in Unauthorized Error', async () => {
    const error = new InvalidCredentialsError();

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Invalid Credentials' })
    );
  });

  it('Should result in mongoose Cast Error', async () => {
    const error = new mongoose.Error.CastError('', '', '');

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Cast Error' }));
  });

  it('Should result in mongoose Validation Error', async () => {
    const error = new mongoose.Error.ValidationError();
    error.errors = {
      email: new mongoose.Error.ValidatorError({
        path: 'email',
        message: 'Email is invalid'
      })
    };

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Validation Error',
        errors: [
          {
            resource: 'email',
            message: 'Email is invalid'
          }
        ]
      })
    );
  });

  it('Should result in Validation Error', async () => {
    const validationResultMock = {
      error: {
        details: [
          {
            message: 'Email is invalid',
            path: ['email']
          }
        ]
      }
    } as unknown as ValidationResult;

    const error = new ValidationError(validationResultMock);

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Validation Error',
        errors: [
          {
            resource: 'email',
            message: 'Email is invalid'
          }
        ]
      })
    );
  });

  it('Should result in Validation Error with empty array if errors is undefined', async () => {
    const validationResultMock = {
      error: undefined
    } as unknown as ValidationResult;

    const error = new ValidationError(validationResultMock);

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Validation Error',
        errors: []
      })
    );
  });

  it('Should result in Custom Api Error', async () => {
    const error = new BadRequestError('');

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Bad Request' }));
  });

  it('Should result in Internal Server Error if usecase throws an unspecified error', async () => {
    const error = new Error('Error');

    ErrorHandler(error, reqMock, resMock, jest.fn());

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Something went wrong' })
    );
  });
});
