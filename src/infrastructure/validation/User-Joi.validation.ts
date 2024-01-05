import Joi from 'joi';
import JoiDate from '@joi/date';

const DateJoi = Joi.extend(JoiDate);

export const UserSignUpValidation = Joi.object({
  firstName: Joi.string().trim(true).messages({
    'string.base': `The firstName provided, '{#value}', is not valid.`,
    'string.empty': 'firstName cannot be empty'
  }),

  lastName: Joi.string().trim(true).messages({
    'string.base': `The lastName provided, '{#value}', is not valid.`,
    'string.empty': 'lastName cannot be empty'
  }),

  birthDate: DateJoi.date().format('YYYY-MM-DD').greater('1900-01-01').messages({
    'date.format': `The birthDate format provided, '{#value}', is not valid. Please use YYYY-MM-DD.`,
    'date.greater': `The birthDate provided must be more recent than 1900-01-01.`
  }),

  city: Joi.string().trim(true).messages({
    'string.base': `The city provided, '{#value}', is not valid.`,
    'string.empty': 'city cannot be empty'
  }),

  country: Joi.string().trim(true).messages({
    'string.base': `The country provided, '{#value}', is not valid.`,
    'string.empty': 'country cannot be empty'
  }),

  email: Joi.string().trim(true).email().messages({
    'string.email': `The email provided, '{#value}', is not valid.`,
    'string.empty': 'email cannot be empty'
  }),

  password: Joi.string().trim(false).messages({
    'string.base': `The password provided, '{#value}', is not valid.`,
    'string.empty': 'password cannot be empty'
  }),

  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'The passwords provided do not match.',
    'any.required': 'The confirmPassword property was not provided'
  })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });

export const UserSignInValidation = Joi.object({
  email: Joi.string().trim(true).email().required().messages({
    'string.email': `The email provided, '{#value}', is not valid.`,
    'string.empty': 'The email cannot be empty',
    'any.required': 'The email is required'
  }),

  password: Joi.string().trim(false).required().messages({
    'string.base': `The password provided, '{#value}', is not valid.`,
    'string.empty': 'The password cannot be empty',
    'any.required': 'The password is required'
  })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });
