import { Router } from 'express';
import { Validator } from '../middlewares/Validator.middleware';
import { UserSignInValidation, UserSignUpValidation } from '../validation/User-Joi.validation';
import UserSignUpController from '../controllers/user/UserSignUp.controller';
import UserSignUp from '../../core/usecases/user/UserSignUp.use-case';
import Connection from '../database/Connection';
import UserInMongoRepository from '../repositories/UserInMongo.repository';
import PasswordHasher from '../providers/PasswordHasher';
import UserSignIn from '../../core/usecases/user/UserSignIn.use-case';
import JWTProvider from '../providers/JwtTokenProvider';
import UserSignInController from '../controllers/user/UserSignIn.controller';

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
