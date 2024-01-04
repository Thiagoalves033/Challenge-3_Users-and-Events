import NotFoundError from '../../../errors/NotFound.error';
import FindOneEvent from '../../../../domain/application/usecases/event/FindOneEvent.use-case';
import { Request, Response } from 'express';

export default class FindOneEventController {
  constructor(private usecase: FindOneEvent) {}

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new NotFoundError(`Could not find any event with id '${id}'`);

    const event = await this.usecase.execute(id);

    res.status(200).json(event);
  };
}
