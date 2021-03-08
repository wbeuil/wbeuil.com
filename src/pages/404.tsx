import NextLink from 'next/link';
import { useI18n } from 'next-localization';

import Container from 'components/Container';
import Anchor from 'components/Anchor';
import Arrow from 'icons/arrow.svg';

const Custom404: React.FC = () => {
  const i18n = useI18n();

  return (
    <Container>
      <div className='max-w-2xl'>
        <h1 className='text-3xl sm:text-5xl font-bold my-8'>
          {i18n.t('404.title')}
        </h1>
        <p className='mb-8'>{i18n.t('404.subtitle')}</p>
        <NextLink href='/' passHref>
          <Anchor className='inline-flex m-auto p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800 text-gray-400'>
            <span className='mr-1' aria-hidden>
              <Arrow width={16} />
            </span>
            {i18n.t('404.button')}
          </Anchor>
        </NextLink>
      </div>
    </Container>
  );
};

export default Custom404;