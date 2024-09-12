import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
      );
      console.log('Request body:', req.body);
      console.log('Request headers:', req.headers);

      // Capture the response
      const originalJson = res.json;
      res.json = function (body) {
        console.log('Response body:', body);
        return originalJson.call(this, body);
      };
    }

    next();
  }
}
