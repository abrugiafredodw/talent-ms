import { Rol } from '../enum/rol.enum';

export class CreateTalentDto {
  name: string;
  surname: string;
  mail: string;
  photo: string;
  rol: Rol;
  avail: boolean;
}
