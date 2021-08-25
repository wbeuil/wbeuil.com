import { render, screen } from 'utils/test-utils';

test('render blog page', async () => {
  render('/blog');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"All blog posts"`);
});
