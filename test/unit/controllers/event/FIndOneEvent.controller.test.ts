import FindOneEvent from '../../../../src/domain/application/usecases/event/FindOneEvent.use-case';
import FindOneEventController from '../../../../src/infrastructure/express/controllers/event/FindOneEvent.controller';
import { Request, Response } from 'express';
// import ErrorHandler from '../../../../src/infrastructure/express/middlewares/ErrorHandler.middleware';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const useCaseMock = new FindOneEvent(eventRepoMock);
useCaseMock.execute = jest.fn();

const reqMock = {
  params: {
    id: 'test'
  }
} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;

const findOneEvent = new FindOneEventController(useCaseMock);

describe('FindOneEvent controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    reqMock.params = { id: 'test' };
  });

  it('Should throw an error if event not fount', async () => {
    reqMock.params = {};

    const result = async () => {
      await findOneEvent.handle(reqMock, resMock);
    };

    expect(result).rejects.toThrow('Could not find any event with id');
  });

  it('Should pass req.params correctly', async () => {
    await findOneEvent.handle(reqMock, resMock);

    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith(reqMock.params.id);
  });

  it('Should pass the returned value from execute to json()', async () => {
    (useCaseMock.execute as jest.Mock).mockResolvedValueOnce('value to json');

    await findOneEvent.handle(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith('value to json');
  });
});
