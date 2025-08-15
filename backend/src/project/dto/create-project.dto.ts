import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverImg: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  tools: string[];

  @IsOptional()
  @IsUrl()
  liveUrl?: string | null;

  @IsOptional()
  @IsNumber()
  orderNo?: number | null;
}
