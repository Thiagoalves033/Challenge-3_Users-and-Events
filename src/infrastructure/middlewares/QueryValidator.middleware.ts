import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';
import ValidationError from '../errors/Validation.error';

export function QueryValidator(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result: ValidationResult = schema.validate(req.query, { abortEarly: false });

    if (result.error) {
      throw new ValidationError(result);
    }

    next();
  };
}
