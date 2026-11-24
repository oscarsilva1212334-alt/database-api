import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  if (statusCode === 500) console.error(err);
  res.status(statusCode).json({
    ok: false,
    message: statusCode === 500 ? 'Error interno del servidor' : err.message,
  });
}
