import FindAllEvents from '../../../../src/domain/application/usecases/event/FindAllEvents.use-case';
import FindAllEventsController from '../../../../src/infrastructure/express/controllers/event/FindAllEvents.controller';
import { Request, Response } from 'express';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const useCaseMock = new FindAllEvents(eventRepoMock);
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

const findAllEvents = new FindAllEventsController(useCaseMock);

describe('FindAllEvents Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass req.query correctly', async () => {
    await findAllEvents.handle(reqMock, resMock);

    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith(reqMock.query);
  });

  it('Should pass the returned value from execute to json()', async () => {
    (useCaseMock.execute as jest.Mock).mockResolvedValueOnce('value to json');

    await findAllEvents.handle(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith('value to json');
  });
});
