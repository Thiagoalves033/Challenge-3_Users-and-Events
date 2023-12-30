import Joi from 'joi';
import JoiDate from '@joi/date';

const DateJoi = Joi.extend(JoiDate);

export const UserSignUpValidation = Joi.object({
  firstName: Joi.string().trim(true).messages({
    'string.base': `The firstName provided, '{#value}', is not valid.`
  }),

  lastName: Joi.string().trim(true).messages({
    'string.base': `The lastName provided, '{#value}', is not valid.`
  }),

  birthDate: DateJoi.date().format('YYYY-MM-DD').greater('1900-01-01').messages({
    'date.base': `The birthDate provided, '{#value}', is not valid.`
  }),

  city: Joi.string().trim(true).messages({
    'string.base': `The city provided, '{#value}', is not valid.`
  }),

  country: Joi.string().trim(true).messages({
    'string.base': `The country provided, '{#value}', is not valid.`
  }),

  email: Joi.string().trim(true).email().messages({
    'string.email': `The email provided, '{#value}', is not valid.`
  }),

  password: Joi.string().trim(false).messages({
    'string.base': `The password provided, '{#value}', is not valid.`
  }),

  confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
    'any.only': 'The passwords provided do not match.'
  })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });

export const UserSignInValidation = Joi.object({
  email: Joi.string().trim(true).email().messages({
    'string.email': `The email provided, '{#value}', is not valid.`
  }),

  password: Joi.string().trim(false).messages({
    'string.base': `The password provided, '{#value}', is not valid.`
  })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });
