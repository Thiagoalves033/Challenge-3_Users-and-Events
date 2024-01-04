import DeleteOneEvent from '../../../src/domain/application/usecases/event/DeleteOneEvent.use-case';

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

const deleteOneEvent = new DeleteOneEvent(eventRepoMock);

describe('DeleteOneEvent usecase', () => {
  it('Should throw an error if no event is found', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(null);

    const eventFound = async () => {
      await deleteOneEvent.execute(singleEventMock.id);
    };

    expect(eventFound).rejects.toThrow('Could not find event');
  });

  it('Should delete the event if found', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(singleEventMock);

    await deleteOneEvent.execute(singleEventMock.id);

    expect(eventRepoMock.deleteById).toHaveBeenCalledWith(singleEventMock.id);
  });
});
