import { Module } from '@nestjs/common';
import { TalentModule } from './talent/talent.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [TalentModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
