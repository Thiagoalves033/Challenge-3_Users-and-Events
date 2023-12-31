import { Request, Response } from 'express';
import FindAllEvents from '../../../core/usecases/event/FindAllEvents.use-case';

export default class FindAllEventsController {
  constructor(private usecase: FindAllEvents) {}

  handle = async (req: Request, res: Response) => {
    const events = await this.usecase.execute(req.query);
    res.status(200).json(events);
  };
}
