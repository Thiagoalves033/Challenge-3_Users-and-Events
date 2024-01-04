import CreateEvent from '../../../domain/application/usecases/event/CreateEvent.use-case';
import FindAllEvents from '../../../domain/application/usecases/event/FindAllEvents.use-case';
import DeleteManyEvents from '../../../domain/application/usecases/event/DeleteManyEvents.use-case';
import FindOneEvent from '../../../domain/application/usecases/event/FindOneEvent.use-case';
import DeleteOneEvent from '../../../domain/application/usecases/event/DeleteOneEvent.use-case';

import UserInMongoRepository from '../../database/repositories/UserInMongo.repository';
import EventInMongoRepository from '../../database/repositories/EventInMongo.repository';
import Connection from '../../database/Connection';

import CreateEventController from '../controllers/event/CreateEvent.controller';
import FindAllEventsController from '../controllers/event/FindAllEvents.controller';
import DeleteManyEventsController from '../controllers/event/DeleteManyEvents.controller';
import FindOneEventController from '../controllers/event/FindOneEvent.controller';
import DeleteOneEventController from '../controllers/event/DeleteOneEvent.controller';

import { CreateEventValidation } from '../../validation/Event-Joi.validation';
import { DeleteManyValidation, FindAllValidation } from '../../validation/Query-Joi.validation';

import { Router } from 'express';
import Validator from '../middlewares/Validator.middleware';
import QueryValidator from '../middlewares/QueryValidator.middleware';
import Authenticator from '../middlewares/Authenticator.middleware';

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
  .post(Validator(CreateEventValidation), Authenticator(UserRepo), createEventController.handle)
  .get(QueryValidator(FindAllValidation), Authenticator(UserRepo), findAllEventsController.handle)
  .delete(
    QueryValidator(DeleteManyValidation),
    Authenticator(UserRepo),
    deleteManyEventsController.handle
  );

eventRouter
  .route('/:id')
  .get(Authenticator(UserRepo), findOneEventController.handle)
  .delete(Authenticator(UserRepo), deleteOneEventController.handle);

export default eventRouter;
