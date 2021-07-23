import { useI18n } from 'next-localization';

import Container from 'components/Container';
import Analytics from 'components/Analytics';
import Vitals from 'components/Vitals';

import type { GetStaticProps } from 'next';

const Metrics: React.FC = () => {
  const i18n = useI18n();

  return (
    <Container
      seo={i18n.t('metrics.seo') as unknown as { [key: string]: string }}>
      <h1 className='text-3xl sm:text-5xl font-bold my-8'>
        {i18n.t('metrics.title')}
      </h1>
      <div className='w-full max-w-2xl relative flex justify-center mb-8'>
        <p className='text-gray-400'>{i18n.t('metrics.explanation')}</p>
      </div>
      <ol className='w-full max-w-2xl grid md:grid-cols-2 gap-4'>
        <li>
          <Analytics siteId='wbeuil.com' />
        </li>
        <li>
          <Vitals />
        </li>
      </ol>
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

export default Metrics;
