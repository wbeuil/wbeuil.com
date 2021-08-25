import { render, screen } from 'utils/test-utils';

test('render 500 page', async () => {
  render('/500');

  await screen.findByRole('button', { name: 'Change theme' });

  expect(
    screen.getByRole('heading', { level: 1 }).textContent,
  ).toMatchInlineSnapshot(`"Wow 😱, you broke everything"`);
});
