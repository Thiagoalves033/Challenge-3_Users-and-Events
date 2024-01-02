import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';
import ValidationError from '../errors/Validation.error';

export function Validator(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result: ValidationResult = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
      throw new ValidationError(result);
    }

    req.body = result.value;
    next();
  };
}
