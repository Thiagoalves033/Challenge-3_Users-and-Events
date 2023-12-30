import { Request, Response, NextFunction } from 'express';

export default function ErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  return res.status(err.status).json({ msg: err.message });
}
