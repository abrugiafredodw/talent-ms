import { Controller, Get } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly configService: ConfigService,
    private health: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private mongoHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memoryHeap', 1024 * 1024 * 1024), // memoria usada no tiene que superar 1 GB
      () =>
        this.memoryHealthIndicator.checkRSS('memoryRSS', 1024 * 1024 * 1024), // la memoria asignada no debe superar a 1 GB
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          thresholdPercent: 0.7,
          path: __dirname,
        }), //el porcentaje del disco no debe exceder del 70%
      () =>
        this.mongoHealthIndicator.pingCheck('mongoDB', {
          timeout: 1500,
          connection: this.connection,
        }), //verifica la conexion con mongo
    ]);
  }
}
