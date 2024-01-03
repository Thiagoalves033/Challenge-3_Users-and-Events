import Joi from 'joi';

export const FindAllValidation = Joi.object({
  day: Joi.string().optional(),
  description: Joi.string().optional(),
  sort: Joi.string().optional(),
  limit: Joi.number().integer().optional(),
  page: Joi.number().integer().optional()
})
  .unknown(false)
  .messages({
    'object.unknown': `The resource '{#label}' is not allowed.`
  });

export const DeleteManyValidation = Joi.object({
  day: Joi.string().optional()
})
  .unknown(false)
  .messages({
    'object.unknown': `The resource '{#label}' is not allowed.`
  });
