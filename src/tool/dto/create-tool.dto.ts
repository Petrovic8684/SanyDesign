import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  emoji: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
