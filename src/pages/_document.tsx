import Document, { Html, Main, Head, NextScript } from 'next/document';

import type {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
} from 'next/document';

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    const { pageProps } = this.props.__NEXT_DATA__.props;

    return (
      <Html dir='ltr'>
        <Head nonce={pageProps.nonce}>
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
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                defer
                data-domain='wbeuil.com'
                src='/js/script.js'
                nonce={pageProps.nonce}
              />
              <script
                nonce={pageProps.nonce}
                dangerouslySetInnerHTML={{
                  __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
                }}
              />
            </>
          )}
        </Head>
        <body className={pageProps.preferredTheme}>
          <Main />
          <NextScript nonce={pageProps.nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
