import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FallbackFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const res = context.getResponse();
    return res.status(500).json({
      errorCode: 500,
      error: exception.message || 'Error en el servidor',
    });
  }
}
