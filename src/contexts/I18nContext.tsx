import { I18nProvider as Provider } from 'next-localization';

import LanguageNegotiation from 'components/LanguageNegotiation';
import { parseCookies, BASE_COOKIE_OPTIONS } from 'utils/cookies';

import type { ProviderProps } from 'next-localization';
import type { NextPageContext } from 'next';

type I18nProps = {
  preferredLanguage: string;
} & ProviderProps<Record<string, unknown>>;

export const getLanguagePreference = (ctx: NextPageContext): string =>
  parseCookies(ctx, BASE_COOKIE_OPTIONS).language;

const I18nProvider: React.FC<I18nProps> = ({ preferredLanguage, ...props }) => {
  return (
    <>
      <Provider {...props} />
      <LanguageNegotiation preferredLanguage={preferredLanguage} />
    </>
  );
};

export default I18nProvider;
