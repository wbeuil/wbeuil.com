import { createContext, useState, useEffect } from 'react';

import { setCookie, parseCookies, BASE_COOKIE_OPTIONS } from 'utils/cookies';

import type { NextPageContext } from 'next';

type ThemeProps = React.PropsWithChildren<{
  preferredTheme: ThemeState;
}>;

export type ThemeDispatch = (state: ThemeState) => void;

export type ThemeState = 'light' | 'dark';

export const ThemeStateContext =
  createContext<ThemeState | undefined>(undefined);
ThemeStateContext.displayName = 'ThemeStateContext';
export const ThemeDispatchContext =
  createContext<ThemeDispatch | undefined>(undefined);
ThemeDispatchContext.displayName = 'ThemeDispatchContext';

export const getThemePreference = (ctx: NextPageContext): string =>
  parseCookies(ctx, BASE_COOKIE_OPTIONS).theme;

const ThemeProvider: React.FC<ThemeProps> = ({ children, preferredTheme }) => {
  const [theme, setTheme] = useState(() => preferredTheme);

  useEffect(() => {
    setCookie(null, 'theme', theme, BASE_COOKIE_OPTIONS);

    if (theme === 'dark') {
      window.document.body.classList.replace('light', 'dark');
    } else {
      window.document.body.classList.replace('dark', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');

    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch (_) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch (_) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={setTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export default ThemeProvider;
