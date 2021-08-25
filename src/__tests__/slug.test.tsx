import { render, screen } from 'utils/test-utils';
import blog from './blog.json';

jest.mock('mdx-bundler', () => ({
  ...jest.requireActual('mdx-bundler'),
  bundleMDXFile: jest.fn().mockReturnValue(blog),
}));

test('render slug page', async () => {
  render('/blog/test');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(screen.queryAllByRole('heading')).toHaveLength(10);
});
