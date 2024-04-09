import { LANGUAGE_NAMES } from '~core/enums/language_names.enum';
import { Languages } from '~core/types/languages.type';

export function getLanguages() {
  const languageMapper = new Map<Languages, LANGUAGE_NAMES>();
  languageMapper.set('en', LANGUAGE_NAMES.ENGLISH);
  languageMapper.set('es', LANGUAGE_NAMES.SPANISH);
  languageMapper.set('ja', LANGUAGE_NAMES.JAPANESE);
  languageMapper.set('vi', LANGUAGE_NAMES.VIETNAMESE);
  languageMapper.set('zh-Hans', LANGUAGE_NAMES.SIMPLIFIED_CHINESE);
  languageMapper.set('zh-Hant', LANGUAGE_NAMES.TRADITIONAL_CHINESE);

  return languageMapper;
}
