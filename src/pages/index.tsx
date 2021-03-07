import { useI18n } from 'next-localization';

import Container from 'components/Container';
import Repos from 'components/Repos';
import Graph from 'components/Graph';

const Home: React.FC = () => {
  const i18n = useI18n();

  return (
    <Container>
      <h1 className='text-3xl sm:text-5xl font-bold my-8'>
        {i18n.t('home.welcome')}
      </h1>
      <div className='w-full md:w-min relative flex justify-center p-3 my-8'>
        <div
          className='bg-primary rounded-lg py-8 px-4'
          style={{ width: '700px' }}>
          <p className='mb-4'>{i18n.t('home.about.1')}</p>
          <p className='mb-4'>{i18n.t('home.about.2')}</p>
          <p>{i18n.t('home.about.3')}</p>
        </div>
        <div className='absolute top-0 w-full h-full bg-orange rounded-lg transform -rotate-2 -z-10' />
        <div className='absolute top-0 w-full h-full bg-orange opacity-20 rounded-lg transform rotate-1 -z-20' />
      </div>
      <h2 className='text-2xl font-medium my-16'>{i18n.t('home.community')}</h2>
      <Repos />
      <Graph />
    </Container>
  );
};

export default Home;
