import FindAllEvents from '../../../src/domain/application/usecases/event/FindAllEvents.use-case';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const eventArrayMock = [
  {
    id: 'id1',
    description: 'description',
    dayOfWeek: 'sunday',
    userId: 'id'
  },

  {
    id: 'id2',
    description: 'description',
    dayOfWeek: 'sunday',
    userId: 'id'
  }
];

const findAllEvents = new FindAllEvents(eventRepoMock);

describe('FindAllEvents usecase', () => {
  it('Should return an array of found events', async () => {
    eventRepoMock.findAll.mockResolvedValueOnce(eventArrayMock);

    const events = await findAllEvents.execute({});

    expect(events).toEqual(expect.any(Array));
    expect(events.length).toBe(2);
    expect(events[0]).toEqual(
      expect.objectContaining({
        id: 'id1',
        description: 'description',
        dayOfWeek: 'sunday',
        userId: 'id'
      })
    );
  });
});
