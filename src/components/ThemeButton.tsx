import { useState, useEffect } from 'react';
import { useI18n } from 'next-localization';

import LightIcon from 'icons/light.svg';
import DarkIcon from 'icons/dark.svg';

const QUERY = '(prefers-color-scheme: dark)';

const ThemeButton: React.FC = () => {
  const i18n = useI18n();
  const [theme, setTheme] = useState(() => {
    return document.body.classList.item(0) as string;
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.replace('light', 'dark');
    } else {
      document.body.classList.replace('dark', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <button
      className='rounded-xl mr-2 md:mr-4 py-2 px-2 hover:bg-secondary active:bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:bg-secondary'
      type='button'
      aria-label={i18n.t('nav.theme')}
      title={i18n.t('nav.theme')}
      onClick={() =>
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
      }>
      {theme === 'light' ? (
        <DarkIcon width={30} height={30} aria-hidden />
      ) : (
        <LightIcon width={30} height={30} aria-hidden />
      )}
    </button>
  );
};

export default ThemeButton;
