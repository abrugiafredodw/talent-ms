import { BadRequestException } from '@nestjs/common';

export class TalentException extends BadRequestException {
  constructor(private mensaje: string) {
    super(mensaje);
  }
}
