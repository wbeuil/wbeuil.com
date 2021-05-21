import { useRouter } from 'next/router';

import ThemeProvider, { getThemePreference } from 'contexts/ThemeContext';
import I18nProvider, { getLanguagePreference } from 'contexts/I18nContext';
import generateRandomString from 'utils/random';

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

  const { default: lngDict = {} } = await import(
    `../locales/${appCtx?.router?.locale || 'en'}.json`
  );

  let nonce = '';
  let header = appCtx?.ctx?.res?.getHeader('content-security-policy');
  if (header) {
    nonce = Buffer.from(generateRandomString(16)).toString('base64');
    header += `script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' http: https:;`;
    appCtx?.ctx?.res?.setHeader('Content-Security-Policy', header);
  }

  return {
    pageProps: {
      ...pageProps,
      nonce,
      lngDict,
      preferredLanguage,
      preferredTheme: getThemePreference(appCtx.ctx) || 'dark',
    },
  };
};

export default MyApp;
