import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rol } from '../enum/rol.enum';
import { Document } from 'mongoose';

export type TalentDocument = Talent & Document;

@Schema()
export class Talent {
  _id: string;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  surname: string;

  @Prop({
    required: true,
    unique: true,
  })
  mail: string;

  @Prop({
    required: true,
  })
  photo: string;

  @Prop({
    required: true,
  })
  rol: Rol;

  @Prop({
    required: true,
  })
  avail: boolean;

}

export const TalentSchema = SchemaFactory.createForClass(Talent);
