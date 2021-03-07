import { useCallback, useContext } from 'react';

import { ThemeDispatchContext, ThemeStateContext } from 'contexts/ThemeContext';

import type { ThemeState } from 'contexts/ThemeContext';

const useThemeState = (): ThemeState => {
  const state = useContext(ThemeStateContext);

  if (state === undefined) {
    throw new Error('useThemeState must be used within an ThemeStateContext');
  }

  return state;
};

const useThemeDispatch = (): [() => void, () => void] => {
  const dispatch = useContext(ThemeDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'useThemeDispatch must be used within an ThemeDispatchContext',
    );
  }

  const setDarkTheme = useCallback(() => dispatch('dark'), [dispatch]);
  const setLightTheme = useCallback(() => dispatch('light'), [dispatch]);

  return [setDarkTheme, setLightTheme];
};

const useTheme = (): [ThemeState, () => void, () => void] => {
  return [useThemeState(), ...useThemeDispatch()];
};

export default useTheme;
