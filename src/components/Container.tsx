import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { useI18n } from 'next-localization';

import Nav from 'components/Nav';
import Footer from 'components/Footer';

import '@reach/skip-nav/styles.css';

const Container: React.FC = ({ children }) => {
  const i18n = useI18n();

  return (
    <>
      <SkipNavLink>{i18n.t('a11y.skipContent')}</SkipNavLink>
      <Nav />
      <SkipNavContent />
      <main className='flex flex-col justify-center items-center px-4 sm:px-6 md:px-8'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Container;
