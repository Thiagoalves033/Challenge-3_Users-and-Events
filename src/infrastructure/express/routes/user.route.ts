import UserSignUp from '../../../domain/application/usecases/user/UserSignUp.use-case';
import UserSignIn from '../../../domain/application/usecases/user/UserSignIn.use-case';

import UserInMongoRepository from '../../database/repositories/UserInMongo.repository';
import Connection from '../../database/Connection';

import UserSignUpController from '../controllers/user/UserSignUp.controller';
import UserSignInController from '../controllers/user/UserSignIn.controller';

import PasswordHasher from '../../adapters/BcryptEncrypter.adapter';
import JWTProvider from '../../adapters/JwtTokenProvider.adapter';

import { UserSignInValidation, UserSignUpValidation } from '../../validation/User-Joi.validation';

import { Router } from 'express';
import Validator from '../middlewares/Validator.middleware';

const userRouter = Router();

const connection = new Connection();

const UserRepo = new UserInMongoRepository(connection);
const PasswordHash = new PasswordHasher();
const Token = new JWTProvider(process.env.JWT_SECRET!);

const SignUpUseCase = new UserSignUp(UserRepo, PasswordHash);
const SignInUseCase = new UserSignIn(UserRepo, PasswordHash, Token);

const signUpController = new UserSignUpController(SignUpUseCase);
const signInController = new UserSignInController(SignInUseCase);

userRouter.route('/sign-up').post(Validator(UserSignUpValidation), signUpController.handle);
userRouter.route('/sign-in').post(Validator(UserSignInValidation), signInController.handle);

export default userRouter;
