import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const statusCode = exception.getStatus();
    return res.status(statusCode).json({
      error: exception.message,
      errorCode: statusCode,
    });
  }
}
