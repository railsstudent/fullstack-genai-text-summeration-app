import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class SummarizeDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  @IsString()
  topic?: string;
}
