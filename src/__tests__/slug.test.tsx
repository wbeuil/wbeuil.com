import fs from 'fs';
import path from 'path';

import { render, screen } from 'utils/test-utils';

jest.mock('mdx-bundler', () => {
  const data = fs.readFileSync(
    path.join(process.cwd(), 'src', '__tests__', 'blog.json'),
    'utf8',
  );
  const blog = JSON.parse(data);

  return {
    ...jest.requireActual('mdx-bundler'),
    bundleMDXFile: jest.fn().mockReturnValue(blog),
  };
});

test('render slug page', async () => {
  render('/blog/test');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(screen.queryAllByRole('heading')).toHaveLength(10);
});
