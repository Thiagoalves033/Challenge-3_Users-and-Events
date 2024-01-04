import Joi from 'joi';

const daysOfWeekEnum = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

export const CreateEventValidation = Joi.object({
  description: Joi.string().trim(true).messages({
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
        'dayOfWeek must be one of the following values: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday'
    })
})
  .unknown(false)
  .messages({
    'object.unknown': `The property '{#value}' is not allowed.`
  });
