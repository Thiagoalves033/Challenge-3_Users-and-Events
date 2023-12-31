import { Router } from 'express';
import { Validator } from '../middlewares/Validator.middleware';
import { CreateEventValidation } from '../validation/Event-Joi.validation';
import UserAuthMiddleware from '../middlewares/UserAuthMiddleware';
import UserInMongoRepository from '../repositories/UserInMongo.repository';
import Connection from '../database/Connection';
import EventInMongoRepository from '../repositories/EventInMongo.repository';
import CreateEvent from '../../core/usecases/event/CreateEvent.use-case';
import CreateEventController from '../controllers/event/CreateEvent.controller';
import FindAllEvents from '../../core/usecases/event/FindAllEvents.use-case';
import FindAllEventsController from '../controllers/event/FindAllEvents.controller';
import DeleteManyEvents from '../../core/usecases/event/DeleteManyEvents.use-case';
import DeleteManyEventsController from '../controllers/event/DeleteManyEvents.controller';
import FindOneEvent from '../../core/usecases/event/FindOneEvent.use-case';
import FindOneEventController from '../controllers/event/FindOneEvent.controller';
import DeleteOneEvent from '../../core/usecases/event/DeleteOneEvent.use-case';
import DeleteOneEventController from '../controllers/event/DeleteOneEvent.controller';

const eventRouter = Router();

const connection = new Connection();

const UserRepo = new UserInMongoRepository(connection);
const EventRepo = new EventInMongoRepository(connection);

const CreateEventUseCase = new CreateEvent(EventRepo);
const FindAllEventsUseCase = new FindAllEvents(EventRepo);
const DeleteManyEventsUseCase = new DeleteManyEvents(EventRepo);
const FindOneEventUseCase = new FindOneEvent(EventRepo);
const DeleteOneEventUseCase = new DeleteOneEvent(EventRepo);

const createEventController = new CreateEventController(CreateEventUseCase, UserRepo);
const findAllEventsController = new FindAllEventsController(FindAllEventsUseCase);
const deleteManyEventsController = new DeleteManyEventsController(DeleteManyEventsUseCase);
const findOneEventController = new FindOneEventController(FindOneEventUseCase);
const deleteOneEventController = new DeleteOneEventController(DeleteOneEventUseCase);

eventRouter
  .route('/')
  .post(
    Validator(CreateEventValidation),
    UserAuthMiddleware(UserRepo),
    createEventController.handle
  )
  .get(UserAuthMiddleware(UserRepo), findAllEventsController.handle)
  .delete(UserAuthMiddleware(UserRepo), deleteManyEventsController.handle);

eventRouter
  .route('/:id')
  .get(UserAuthMiddleware(UserRepo), findOneEventController.handle)
  .delete(UserAuthMiddleware(UserRepo), deleteOneEventController.handle);

export default eventRouter;
