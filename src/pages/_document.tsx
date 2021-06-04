import Document, { Html, Main, Head, NextScript } from 'next/document';

import generateRandomString from 'utils/random';
import createCSP from 'utils/csp';

import type {
  DocumentProps,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

type CustomProps = {
  nonce: string;
};

class MyDocument extends Document<DocumentProps & CustomProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & CustomProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const nonce = Buffer.from(generateRandomString(16)).toString('base64');

    return { ...initialProps, nonce };
  }

  render(): JSX.Element {
    const { nonce } = this.props;

    return (
      <Html dir='ltr'>
        <Head nonce={nonce}>
          <link
            rel='preload'
            href='/fonts/work-sans.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link rel='shortcut icon' href='/favicons/favicon.ico' />
          <link
            rel='icon'
            type='image/png'
            href='/favicons/favicon-32x32.png'
            sizes='32x32'
          />
          <link
            rel='icon'
            type='image/png'
            href='/favicons/favicon-16x16.png'
            sizes='16x16'
          />
          <link
            rel='apple-touch-icon'
            href='/favicons/apple-touch-icon.png'
            sizes='180x180'
          />
          <link
            rel='mask-icon'
            href='/favicons/safari-pinned-tab.svg'
            color='#14191e'
          />
          <meta name='theme-color' content='#14191e' />
          <meta name='color-scheme' content='dark light' />
          <meta
            httpEquiv='Content-Security-Policy'
            content={createCSP(nonce)}
          />
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                defer
                data-domain='wbeuil.com'
                src='/js/script.js'
                nonce={nonce}
              />
              <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                  __html: `window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `function getThemePreference(){return localStorage.getItem("theme")?localStorage.getItem("theme"):window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.body.classList.add(getThemePreference());`,
            }}
          />
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
