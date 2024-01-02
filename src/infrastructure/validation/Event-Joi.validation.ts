import Joi from 'joi';

const daysOfWeekEnum = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export const CreateEventValidation = Joi.object({
  description: Joi.string().messages({
    'string.base': `The description provided, '{#value}', is not valid.`,
    'string.empty': 'description cannot be empty'
  }),
  dayOfWeek: Joi.string()
    .trim(true)
    .lowercase()
    .valid(...daysOfWeekEnum)
    .messages({
      'string.base': `The dayOfWeek provided, '{#value}', is not valid.`,
      'string.empty': 'dayOfWeek cannot be empty',
      'any.only':
        'dayOfWeek must be one of the following values: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
    })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });
