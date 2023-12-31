import { Request, Response } from 'express';
import NotFoundError from '../../errors/NotFound.error';
import DeleteOneEvent from '../../../core/usecases/event/DeleteOneEvent.use-case';

export default class DeleteOneEventController {
  constructor(private usecase: DeleteOneEvent) {}

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new NotFoundError(`Could not find any event with id '${id}'`);

    const event = await this.usecase.execute(id);

    res.status(204).json(event);
  };
}
