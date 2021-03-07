import { useI18n } from 'next-localization';

import FlagButton from 'components/FlagButton';
import ThemeButton from 'components/ThemeButton';
import NavLink from 'components/NavLink';
import useHiddenNav from 'hooks/useHiddenNav';

const Nav: React.FC = () => {
  const i18n = useI18n();
  const [navRef, isNavVisible] = useHiddenNav();
  const classes = isNavVisible ? 'navbar' : 'navbar navbar-hidden';

  return (
    <nav ref={navRef} className={`sticky top-0 z-10 bg-primary ${classes}`}>
      <div className='flex justify-between items-center max-w-4xl w-full p-4 my-0 md:my-4 mx-auto'>
        <div>
          <NavLink href='/'>{i18n.t('nav.home')}</NavLink>
          {/* <NavLink href='/'>{i18n.t('nav.blog')}</NavLink> */}
        </div>
        <div className='flex flex-row'>
          <FlagButton />
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
