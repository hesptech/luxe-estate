import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export const getDictionary = async (locale: ReturnType<typeof getLocaleFromCookie>) => {
  const lang = locale in dictionaries ? (locale as Locale) : 'en';
  return dictionaries[lang]();
};

export const getLocaleFromCookie = (cookieValue: string | undefined): Locale => {
  if (!cookieValue) return 'en';
  if (cookieValue in dictionaries) return cookieValue as Locale;
  return 'en';
};
