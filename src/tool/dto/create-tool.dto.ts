import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  orderNo?: number | null;
}
