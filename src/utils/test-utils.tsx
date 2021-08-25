import { getPage } from 'next-page-tester';
import { build, fake, perBuild } from '@jackfranklin/test-data-bot';

import type { Information } from 'components/BlogContainer';

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

Object.defineProperty(window, 'plausible', {
  value: jest.fn(),
});

const blogBuilder = build<Information>('Blog', {
  fields: {
    slug: fake((f) => `/blog/${f.lorem.slug()}`),
    readingTime: {
      minutes: fake((f) => f.random.number({ min: 2, max: 10 })),
    },
    title: fake((f) => f.name.title()),
    description: fake((f) => f.lorem.sentences()),
    locale: perBuild(() => 'en'),
    alternate: fake((f) => `/blog/${f.lorem.slug()}`),
    isPublished: perBuild(() => true),
    publishedAt: fake((f) => {
      const date = f.date.past();
      const year = date.getUTCFullYear();
      const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
      const day = ('0' + date.getUTCDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }),
    tags: perBuild(() => ['react', 'test']),
  },
});

const customRender = async (route: string): Promise<void> => {
  const { render } = await getPage({
    route,
  });
  render();
};

export * from '@testing-library/react';

export { customRender as render, blogBuilder };
