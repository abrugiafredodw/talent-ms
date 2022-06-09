import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Talent, TalentDocument } from '../schema/talent.schema';
import { CreateTalentDto } from '../dto/create-talent.dto';
import { UpdateTalentDto } from '../dto/update-talent.dto';

@Injectable()
export class TalentRepository {
  constructor(
    @InjectModel(Talent.name) private readonly talentMD: Model<TalentDocument>,
  ) {}

  async createTalents(createTalentDto: CreateTalentDto): Promise<Talent> {
    const talentCreate = new this.talentMD(createTalentDto);
    return talentCreate.save();
  }

  async updateTalent(updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentMD.findOneAndUpdate(
      { _id: updateTalentDto._id },
      updateTalentDto,
      { new: true },
    );
  }

  async findAll(options?: any): Promise<Talent[]> {
    return this.talentMD.find(options).exec();
  }

  async findOne(options?: any): Promise<Talent> {
    return this.talentMD.findOne(options).exec();
  }

  async deleteTalent(id: string): Promise<Talent> {
    return this.talentMD.findByIdAndRemove(id);
  }
}
