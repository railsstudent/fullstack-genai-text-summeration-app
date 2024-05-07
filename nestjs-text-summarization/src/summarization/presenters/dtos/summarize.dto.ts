import { IsIn, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Languages } from '~core/types/languages.type';

export class SummarizeDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['en', 'zh-Hant', 'zh-Hans'])
  code: Languages;
}
