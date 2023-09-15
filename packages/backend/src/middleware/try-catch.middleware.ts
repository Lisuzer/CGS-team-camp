import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export const TryCatch =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        return res.status(400).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An error occurred' });
    }
  };
