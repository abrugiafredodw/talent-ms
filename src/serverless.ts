// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { FallbackFilter } from './filters/fallback.filter';
import { ErrorFilter } from './filters/error.filter';
import { HealthFilter } from './filters/health.filter';

import express from 'express';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const expresAdapter = new ExpressAdapter(expressApp);
    const nestApp = await NestFactory.create(AppModule, expresAdapter);
    nestApp.use(eventContext());
    nestApp.useLogger(nestApp.get(Logger));
    nestApp.useGlobalInterceptors(new LoggerErrorInterceptor());
    nestApp.useGlobalFilters(
      new FallbackFilter(),
      new ErrorFilter(),
      new HealthFilter(),
    );
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

// Export the handler : the entry point of the Lambda function
export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
