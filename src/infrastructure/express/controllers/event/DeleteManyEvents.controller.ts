import DeleteManyEvents from '../../../../domain/application/usecases/event/DeleteManyEvents.use-case';
import { Request, Response } from 'express';

export default class DeleteManyEventsController {
  constructor(private usecase: DeleteManyEvents) {}

  handle = async (req: Request, res: Response) => {
    const events = await this.usecase.execute(req.query);
    res.status(200).json(events);
  };
}
