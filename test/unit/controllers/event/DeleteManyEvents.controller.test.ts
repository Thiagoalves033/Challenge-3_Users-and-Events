import DeleteManyEvents from '../../../../src/domain/application/usecases/event/DeleteManyEvents.use-case';
import DeleteManyEventsController from '../../../../src/infrastructure/express/controllers/event/DeleteManyEvents.controller';
import { Request, Response } from 'express';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const useCaseMock = new DeleteManyEvents(eventRepoMock);
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

const deleteEvents = new DeleteManyEventsController(useCaseMock);

describe('DeleteManyEvents Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass req.query correctly', async () => {
    await deleteEvents.handle(reqMock, resMock);

    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith(reqMock.query);
  });

  it('Should pass the returned value from execute to json()', async () => {
    (useCaseMock.execute as jest.Mock).mockResolvedValueOnce('value to json');

    await deleteEvents.handle(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith('value to json');
  });
});
