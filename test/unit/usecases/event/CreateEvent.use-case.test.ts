import Event from '../../../../src/domain/enterprise/entities/Event.entity';
import CreateEvent from '../../../../src/domain/application/usecases/event/CreateEvent.use-case';

const eventRepoMock = {
  insert: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn()
};

const eventMock = {
  description: 'description',
  dayOfWeek: 'sunday',
  userId: 'id'
};

const createEvent = new CreateEvent(eventRepoMock);

describe('CreateEvent usecase', () => {
  it('Should insert an event with correct userId', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(new Event(eventMock));

    await createEvent.execute(eventMock);

    expect(eventRepoMock.insert).toHaveBeenCalledWith(expect.any(Event));
    expect(eventRepoMock.insert).toHaveBeenCalledWith(expect.objectContaining({ userId: 'id' }));
  });

  it('Should throw an error if event is not saved correctly', async () => {
    eventRepoMock.findById.mockResolvedValueOnce(null);

    const savedEvent = async () => {
      await createEvent.execute(eventMock);
    };

    expect(savedEvent).rejects.toThrow('Could not save');
  });

  it('Should return an object with correct properties', async () => {
    const mockEventUserId = new Event(eventMock);
    mockEventUserId.setUserId(eventMock.userId);

    eventRepoMock.findById.mockResolvedValueOnce(mockEventUserId);

    const event = await createEvent.execute(eventMock);

    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('description', 'description');
    expect(event).toHaveProperty('dayOfWeek', 'sunday');
    expect(event).toHaveProperty('userId', 'id');
  });
});
