import type { DefaultSeoProps } from 'next-seo';

const english: DefaultSeoProps = {
  title: 'William Beuil – French developer.',
  description:
    'React, React Native, Go enthusiast and AWS certified developer.',
  canonical: 'https://wbeuil.com/',
  openGraph: {
    locale: 'en_US',
  },
};

const french: DefaultSeoProps = {
  title: 'William Beuil – Développeur français.',
  description: 'Développeur orienté React, React Native, Go et certifié AWS',
  canonical: 'https://wbeuil.com/fr/',
  openGraph: {
    locale: 'fr_FR',
  },
};

const configs: { [key: string]: DefaultSeoProps } = {
  'en-US': english,
  fr: french,
};

const SEO = (language = 'en-US'): DefaultSeoProps => {
  const { openGraph, ...rest } = configs[language];

  return {
    ...rest,
    languageAlternates: [
      {
        hrefLang: 'en-US',
        href: 'https://wbeuil.com/',
      },
      {
        hrefLang: 'fr',
        href: 'https://wbeuil.com/fr/',
      },
    ],
    openGraph: {
      ...openGraph,
      type: 'website',
      images: [
        {
          url: 'https://wbeuil.com/images/preview.png',
          width: 1200,
          height: 628,
          alt: 'Image Alt wbeuil.com',
        },
      ],
    },
    twitter: {
      handle: '@wbeuil',
      site: '@wbeuil',
      cardType: 'summary_large_image',
    },
  };
};

export default SEO;
