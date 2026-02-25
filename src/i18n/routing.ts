import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt-BR', 'en', 'es', 'zh'],
  defaultLocale: 'pt-BR',
});

export type Locale = (typeof routing.locales)[number];
