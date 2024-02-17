import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'Silverstone',
    icon: '/static/icons/silverstone.png'
  },
  {
    value: 'de',
    label: 'Sysco Labs',
    icon: '/static/icons/mitrai_logo.png'
  },
  {
    value: 'rr',
    label: 'Mitra Innovation',
    icon: '/static/icons/logo_sysco.png'
  }
];

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const currentLang = LANGS.find((_lang) => _lang.value === 'en');

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS
  };
}
