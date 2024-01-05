import UserSignUp from '../../../../src/domain/application/usecases/user/UserSignUp.use-case';
import UserSignUpController from '../../../../src/infrastructure/express/controllers/user/UserSignUp.controller';
import { Request, Response } from 'express';

const userRepoMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn()
};

const encrypterMock = {
  encrypt: jest.fn(),
  compare: jest.fn()
};

const useCaseMock = new UserSignUp(userRepoMock, encrypterMock);
useCaseMock.execute = jest.fn();

const reqMock = {
  query: {
    email: 'email@test.com'
  }
} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

const signUp = new UserSignUpController(useCaseMock);

describe('UserSignUp controller', () => {
  it('Should pass the returned value from execute to json()', async () => {
    const result = await signUp.handle(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith(result);
  });
});
