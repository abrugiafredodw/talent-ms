import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { TalentRepository } from './repository/talent.repository';
import { Talent } from './schema/talent.schema';
import { TalentException } from './exception/talent.exception';

@Injectable()
export class TalentService {
  constructor(private readonly talentRp: TalentRepository) {}

  async create(createTalentDto: CreateTalentDto): Promise<Talent> {
    const options = {
      mail: createTalentDto.mail,
    };
    const talent = await this.talentRp.findOne(options);
    if (talent != null) {
      if (talent.avail) {
        throw new TalentException('El talento que intentas crear ya existe');
      } else {
        const talentUP: UpdateTalentDto = {
          _id: talent._id,
          name: talent.name,
          surname: talent.surname,
          photo: talent.photo,
          mail: talent.mail,
          rol: talent.rol,
          avail: true,
        };
        return this.talentRp.updateTalent(talentUP);
      }
    }
    return this.talentRp.createTalents(createTalentDto);
  }

  async findAll(options?: any): Promise<Talent[]> {
    return this.talentRp.findAll(options);
  }

  async findOne(options: any): Promise<Talent> {
    const talent = await this.talentRp.findOne(options);
    if (talent == null) {
      throw new TalentException('No se encontro el talento');
    }
    return talent;
  }

  async update(updateTalentDto: UpdateTalentDto): Promise<Talent> {
    const options = {
      _id: updateTalentDto._id,
    };
    const talent = await this.talentRp.findOne(options);
    if (talent == null) {
      throw new TalentException('No se encontro el talento');
    }
    return this.talentRp.updateTalent(updateTalentDto);
  }

  async remove(id: string): Promise<Talent> {
    const options = {
      _id: id,
      avail: true,
    };
    const talent = await this.talentRp.findOne(options);
    if (talent == null) {
      throw new TalentException('No se encontro el talento');
    }
    const talentUP: UpdateTalentDto = {
      _id: talent._id,
      name: talent.name,
      surname: talent.surname,
      photo: talent.photo,
      mail: talent.mail,
      rol: talent.rol,
      avail: false,
    };
    return this.talentRp.updateTalent(talentUP);
  }
}
