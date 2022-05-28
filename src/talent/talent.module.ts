import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Talent, TalentSchema } from './schema/talent.schema';
import { TalentRepository } from './repository/talent.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talent.name, schema: TalentSchema }]),
  ],
  controllers: [TalentController],
  providers: [TalentService, TalentRepository],
})
export class TalentModule {}
