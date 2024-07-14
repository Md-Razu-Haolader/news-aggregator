import ValidationError from '@/exceptions/index';
import logger from '@/utils/logger';
import { Request, Response } from 'express';
import { HttpError, Middleware, NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class HandleException {
  error(error: Error, _request: Request, response: Response) {
    if (error instanceof NotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return response.status(422).json(error.toJSON());
    }

    if (error instanceof HttpError && error.httpCode === 404) {
      return response.status(404).json({ message: error.message });
    }

    // Log the error except 404 and 422
    if (process.env.APP_DEBUG === 'true') {
      logger.inspect(error);
    } else {
      logger.error(error.message);
    }

    // Handle the error
    if (error instanceof HttpError && error.httpCode !== 500) {
      return response.status(error.httpCode).json({ message: error.message });
    }

    return response
      .status(500)
      .json({ message: process.env.APP_DEBUG === 'true' ? error.message : 'Internal server error!' });
  }
}
