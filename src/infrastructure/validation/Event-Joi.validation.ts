import Joi from 'joi';

export const CreateEventValidation = Joi.object({
  description: Joi.string().messages({
    'string.base': `The description provided, '{#value}', is not valid.`
  }),
  dayOfWeek: Joi.string().trim(true).messages({
    'string.base': `The dayOfWeek provided, '{#value}', is not valid.`
  })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });
