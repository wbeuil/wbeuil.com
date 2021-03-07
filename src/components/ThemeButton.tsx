import { useI18n } from 'next-localization';

import useTheme from 'hooks/useTheme';
import LightIcon from 'icons/light.svg';
import DarkIcon from 'icons/dark.svg';

const ThemeButton: React.FC = () => {
  const [theme, setDarkTheme, setLightTheme] = useTheme();
  const i18n = useI18n();

  return (
    <button
      className='rounded-xl ml-2 py-2 px-2 hover:bg-secondary active:bg-tertiary focus:outline-none focus:ring-2'
      type='button'
      aria-label={i18n.t('nav.theme')}
      onClick={theme === 'light' ? setDarkTheme : setLightTheme}>
      {theme === 'light' ? (
        <DarkIcon width={30} height={30} />
      ) : (
        <LightIcon width={30} height={30} />
      )}
    </button>
  );
};

export default ThemeButton;
