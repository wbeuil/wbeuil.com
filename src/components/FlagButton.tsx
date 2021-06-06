import { animated } from 'react-spring';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';

import useBoop from 'hooks/useBoop';
import FlagUS from 'icons/us-flag.svg';
import FlagFR from 'icons/fr-flag.svg';
import Caret from 'icons/caret.svg';

import '@reach/menu-button/styles.css';

type FlagButtonProps = {
  alternate: string;
};

const FlagButton: React.FC<FlagButtonProps> = ({ alternate }) => {
  const [style, trigger] = useBoop({ y: 4 });
  const router = useRouter();
  const i18n = useI18n();

  const isFR = router?.locale === 'fr';
  const to = isFR ? alternate : `/fr${alternate}`;
  const language = isFR ? 'en' : 'fr';

  return (
    <Menu>
      {({ isExpanded }) => (
        <>
          <MenuButton
            aria-label={i18n.t('nav.language')}
            title={i18n.t('nav.language')}
            className='flex flex-row justify-center items-center rounded-xl py-2 px-2 hover:bg-secondary active:bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:bg-secondary'
            onMouseEnter={() => trigger(true)}>
            {isFR ? (
              <>
                <FlagFR width={30} height={30} aria-hidden />
                <span className='sr-only'>Français</span>
              </>
            ) : (
              <>
                <FlagUS width={30} height={30} aria-hidden />
                <span className='sr-only'>English</span>
              </>
            )}
            <animated.span className='ml-2' style={style} aria-hidden>
              <Caret width={24} height={24} />
            </animated.span>
          </MenuButton>
          <MenuList
            className={`rounded-xl mt-2 ${isExpanded ? 'slide-down' : ''}`}>
            <NextLink href={to} locale={language}>
              <MenuLink
                as='a'
                href={to}
                lang={language}
                className='flex-row justify-center items-center focus:outline-none'>
                {isFR ? (
                  <>
                    <FlagUS
                      width={30}
                      height={30}
                      className='mr-3'
                      aria-hidden
                    />
                    <span>English</span>
                  </>
                ) : (
                  <>
                    <FlagFR
                      width={30}
                      height={30}
                      className='mr-3'
                      aria-hidden
                    />
                    <span>Français</span>
                  </>
                )}
              </MenuLink>
            </NextLink>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default FlagButton;
