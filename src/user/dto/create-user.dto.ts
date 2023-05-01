import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  emailId: string;
  @IsNotEmpty()
  password: string;
}
