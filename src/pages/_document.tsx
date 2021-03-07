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
        <Head>
          <link rel='icon' type='image/svg+xml' href='/images/favicon.svg' />
          <link rel='alternate icon' href='/images/favicon.ico' />
          <link
            rel='mask-icon'
            href='/images/safari-pinned-tab.svg'
            color='#14191e'
          />
          <link
            rel='preload'
            href='/fonts/Ubuntu/Ubuntu-Regular.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/Ubuntu/Ubuntu-Medium.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/Ubuntu/Ubuntu-Bold.ttf'
            as='font'
            crossOrigin=''
          />
        </Head>
        <body className={pageProps.preferredTheme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
