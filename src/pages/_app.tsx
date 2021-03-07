import { useRouter } from 'next/router';

import ThemeProvider, { getThemePreference } from 'contexts/ThemeContext';
import I18nProvider, { getLanguagePreference } from 'contexts/I18nContext';
import Head from 'components/Head';

import 'styles/index.css';

import type { AppProps, AppContext } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { lngDict, preferredLanguage, preferredTheme, ...rest } = pageProps;
  const router = useRouter();

  return (
    <I18nProvider
      lngDict={lngDict}
      locale={router?.locale as string}
      preferredLanguage={preferredLanguage}>
      <ThemeProvider preferredTheme={preferredTheme}>
        <Head locale={router?.locale as string} />
        <Component {...rest} />
      </ThemeProvider>
    </I18nProvider>
  );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  let pageProps = {};

  if (appCtx?.Component?.getInitialProps) {
    pageProps = await appCtx.Component.getInitialProps(appCtx.ctx);
  }

  const preferredLanguage = getLanguagePreference(appCtx.ctx);

  if (
    appCtx?.router?.locale !== preferredLanguage &&
    preferredLanguage !== undefined
  ) {
    const location =
      preferredLanguage === 'en-US' ? '/' : `/${preferredLanguage}`;
    appCtx?.ctx?.res?.writeHead(307, { Location: location }).end();
  }

  const { default: lngDict = {} } = await import(
    `../locales/${appCtx?.router?.locale || 'en-US'}.json`
  );

  return {
    pageProps: {
      ...pageProps,
      lngDict,
      preferredLanguage,
      preferredTheme: getThemePreference(appCtx.ctx) || 'dark',
    },
  };
};

export default MyApp;
