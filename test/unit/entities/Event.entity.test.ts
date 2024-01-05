import Event, { EventProps } from '../../../src/domain/enterprise/entities/Event.entity';

describe('Event entity', () => {
  it('Should have the correct properties for an event', () => {
    const eventInput: EventProps = {
      description: 'A new event',
      dayOfWeek: 'sunday'
    };

    const event = new Event(eventInput);

    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('description', 'A new event');
    expect(event).toHaveProperty('dayOfWeek', 'sunday');
    expect(event).toHaveProperty('userId', undefined);
  });

  it('Should have the specified id', () => {
    const eventInput: EventProps = {
      description: 'A new event',
      dayOfWeek: 'sunday'
    };

    const event = new Event(eventInput, 'id');

    expect(event.id).toBe('id');
  });

  it('Should set the specified userId', () => {
    const eventInput: EventProps = {
      description: 'A new event',
      dayOfWeek: 'sunday'
    };

    const event = new Event(eventInput, 'id');
    event.setUserId('id');

    expect(event.userId).toBe('id');
  });
});
