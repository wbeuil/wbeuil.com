import { render } from '@testing-library/react';

import I18nProvider from 'contexts/I18nContext';
import ThemeProvider from 'contexts/ThemeContext';
import lngDict from 'locales/en-US.json';

import type { RenderOptions, RenderResult } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const AllTheProviders: React.ComponentType = ({ children }) => {
  return (
    <I18nProvider lngDict={lngDict} locale='en-US' preferredLanguage='en-US'>
      <ThemeProvider preferredTheme='dark'>{children}</ThemeProvider>
    </I18nProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
