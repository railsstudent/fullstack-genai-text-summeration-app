import { IsIn, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Languages } from '~summarization/application/types/language.type';

export class SummarizeDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['en', 'es', 'ja', 'vi', 'zh-Hant', 'zh-Hans'])
  language: Languages;
}
