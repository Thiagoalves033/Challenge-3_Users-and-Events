import UserSignIn from '../../../../src/domain/application/usecases/user/UserSignIn.use-case';
import UserSignInController from '../../../../src/infrastructure/express/controllers/user/UserSignIn.controller';
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

const tokenProviderMock = {
  generate: jest.fn(),
  verify: jest.fn()
};

const useCaseMock = new UserSignIn(userRepoMock, encrypterMock, tokenProviderMock);
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

const signIn = new UserSignInController(useCaseMock);

describe('UserSignUp controller', () => {
  it('Should pass the returned value from execute to json()', async () => {
    const result = await signIn.handle(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(result);
  });
});
