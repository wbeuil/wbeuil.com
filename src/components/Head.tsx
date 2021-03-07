import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import SEO from 'utils/seo';

type HeadProps = {
  locale: string;
};

const Head: React.FC<HeadProps> = ({ locale }) => {
  return (
    <>
      <NextHead>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta name='theme-color' content='#14191e' />
      </NextHead>
      <DefaultSeo {...SEO(locale)} />
    </>
  );
};

export default Head;
