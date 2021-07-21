import { useEffect } from 'react';
import NextLink from 'next/link';
import { useI18n } from 'next-localization';

import Container from 'components/Container';
import Anchor from 'components/Anchor';
import Arrow from 'icons/arrow.svg';

import type { GetStaticProps } from 'next';

const Custom500: React.FC = () => {
  const i18n = useI18n();

  useEffect(() => {
    if (window.plausible) {
      window.plausible('500', { props: { path: document.location.pathname } });
    }
  }, []);

  return (
    <Container seo={i18n.t('500.seo') as unknown as { [key: string]: string }}>
      <div className='max-w-2xl'>
        <h1 className='text-3xl sm:text-5xl font-bold my-8'>
          {i18n.t('500.title')}
        </h1>
        <p className='mb-8'>{i18n.t('500.subtitle')}</p>
        <NextLink href='/' passHref>
          <Anchor className='inline-flex m-auto p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800 text-gray-400'>
            <span className='mr-1' aria-hidden>
              <Arrow width={16} />
            </span>
            {i18n.t('500.button')}
          </Anchor>
        </NextLink>
      </div>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const language = await import(`../locales/${locale}.json`);

  return {
    props: {
      lngDict: language.default,
    },
  };
};

export default Custom500;
