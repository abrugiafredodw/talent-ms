import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalentService } from './talent.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent } from './schema/talent.schema';

@Controller('talent')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post()
  async create(@Body() createTalentDto: CreateTalentDto): Promise<Talent> {
    return this.talentService.create(createTalentDto);
  }

  @Get()
  async findAll(): Promise<Talent[]> {
    return this.talentService.findAll();
  }

  @Get(':mail')
  async findOne(@Param('mail') mail: string): Promise<Talent> {
    const options = {
      mail: mail,
    };
    return this.talentService.findOne(options);
  }

  @Get(':mail/avail')
  async findOneAvail(@Param('mail') mail: string): Promise<Talent> {
    const options = {
      mail: mail,
      avail: true,
    };
    return this.talentService.findOne(options);
  }

  async update(@Body() updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentService.update(updateTalentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Talent> {
    return this.talentService.remove(id);
  }
}
