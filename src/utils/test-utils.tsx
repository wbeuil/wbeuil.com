import preloadAll from 'jest-next-dynamic';
import { I18nProvider } from 'next-localization';
import { render } from '@testing-library/react';

import lngDict from 'locales/en.json';

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

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

beforeAll(async () => {
  await preloadAll();
});

const AllTheProviders: React.ComponentType = ({ children }) => {
  return (
    <I18nProvider lngDict={lngDict} locale='en'>
      {children as React.ReactElement}
    </I18nProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
