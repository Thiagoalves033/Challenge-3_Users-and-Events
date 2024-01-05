import User from '../../../../src/domain/enterprise/entities/User.entity';
import CreateEvent from '../../../../src/domain/application/usecases/event/CreateEvent.use-case';
import CreateEventController from '../../../../src/infrastructure/express/controllers/event/CreateEvent.controller';
import { Request, Response } from 'express';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const userRepoMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn()
};

const userMock = {
  firstName: 'first name',
  lastName: 'last name',
  birthDate: 'birthdate',
  city: 'city',
  country: 'country',
  email: 'email',
  password: 'password'
};

const newUser = new User(userMock);

const reqMock = {
  user: {
    email: 'email@test.com'
  }
} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

const useCaseMock = new CreateEvent(eventRepoMock);
useCaseMock.execute = jest.fn();

const createEvent = new CreateEventController(useCaseMock, userRepoMock);

describe('CreateEvent Controller', () => {
  it('Should throw an error if user is invalid', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(null);

    const result = async () => {
      await createEvent.handle(reqMock, resMock);
    };

    expect(result).rejects.toThrow('Invalid user');
  });

  it('Should pass an input with userId to execute', async () => {
    userRepoMock.findByEmail.mockResolvedValueOnce(newUser);

    await createEvent.handle(reqMock, resMock);

    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith(
      expect.objectContaining({ userId: expect.anything() })
    );
  });
});
