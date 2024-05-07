import { LANGUAGE_NAMES } from '~core/enums/language_names.enum';
import { Languages } from '~core/types/languages.type';

export function getLanguages() {
  const languageMapper = new Map<Languages, LANGUAGE_NAMES>();
  languageMapper.set('en', LANGUAGE_NAMES.ENGLISH);
  languageMapper.set('zh-Hans', LANGUAGE_NAMES.SIMPLIFIED_CHINESE);
  languageMapper.set('zh-Hant', LANGUAGE_NAMES.TRADITIONAL_CHINESE);

  return languageMapper;
}
