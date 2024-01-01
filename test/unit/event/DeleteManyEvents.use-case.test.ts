import DeleteManyEvents from '../../../src/core/usecases/event/DeleteManyEvents.use-case';

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

const deleteManyEvents = new DeleteManyEvents(eventRepoMock);

describe('DeleteManyEvents usecase', () => {
  it('Should return an array of deleted events', async () => {
    eventRepoMock.deleteMany.mockResolvedValueOnce(eventArrayMock);

    const events = await deleteManyEvents.execute({});

    expect(events).toEqual(expect.any(Array));
    expect(events.length).toBe(2);
    expect(events[1]).toEqual(
      expect.objectContaining({
        id: 'id2',
        description: 'description',
        dayOfWeek: 'sunday',
        userId: 'id'
      })
    );
  });
});
