import { Request, Response } from 'express';
import DeleteManyEvents from '../../../core/usecases/event/DeleteManyEvents.use-case';

export default class DeleteManyEventsController {
  constructor(private usecase: DeleteManyEvents) {}

  handle = async (req: Request, res: Response) => {
    const events = await this.usecase.execute(req.query);
    res.status(200).json(events);
  };
}
