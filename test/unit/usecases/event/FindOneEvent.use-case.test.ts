import FindOneEvent from '../../../../src/domain/application/usecases/event/FindOneEvent.use-case';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const singleEventMock = {
  id: 'id1',
  description: 'description',
  dayOfWeek: 'sunday',
  userId: 'id'
};

const findOneEvent = new FindOneEvent(eventRepoMock);

describe('FindOneEvent usecase', () => {
  it('Should throw an error if no event is found', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(null);

    const eventFound = async () => {
      await findOneEvent.execute(singleEventMock.id);
    };

    expect(eventFound).rejects.toThrow('Could not find event');
  });

  it('Should return the found event', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(singleEventMock);

    const event = await findOneEvent.execute(singleEventMock.id);

    expect(event).toEqual(
      expect.objectContaining({
        id: 'id1',
        description: 'description',
        dayOfWeek: 'sunday',
        userId: 'id'
      })
    );
  });
});
