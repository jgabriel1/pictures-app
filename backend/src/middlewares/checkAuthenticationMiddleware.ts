import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';

type TokenPayload = {
  user_id: string;
};

export const checkAuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, config.jwtSecret);

    const { user_id } = decoded as TokenPayload;

    req.user_id = user_id;

    return next();
  } catch {
    throw new AppError('Invalid credentials.', 401);
  }
};
