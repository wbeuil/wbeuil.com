import { render, screen } from 'utils/test-utils';

test('render 404 page', async () => {
  render('/404');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"Sorry 😩, this page can't be found"`);
});
